/**
 * Load slide image URLs from Firebase Storage (dashboard-style listAll + getDownloadURL).
 * Supports flat folders (e.g. slideshow/) or recursive listing (e.g. cms/wedding-hall with subfolders).
 *
 * Includes files by extension (.avif, .jpg, …) and, when needed, by Storage metadata
 * contentType (e.g. image/avif if the object name has no .avif suffix).
 */
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  listAll,
  getDownloadURL,
  getMetadata,
  type StorageReference,
} from "firebase/storage";

/** Filename extension — AVIF and common web / mobile image types */
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|bmp|svg|heic|heif)$/i;

function normalizePath(path: string): string {
  return path.replace(/^\/+/, "").replace(/\/+$/, "");
}

/** Every file under folder (recursive) */
async function listAllFilesRecursive(
  dirRef: StorageReference
): Promise<StorageReference[]> {
  const res = await listAll(dirRef);
  const files = [...res.items];
  const subLists = await Promise.all(
    res.prefixes.map((p) => listAllFilesRecursive(p))
  );
  return [...files, ...subLists.flat()];
}

/**
 * Keep refs that look like images: known extension OR Storage contentType image/*
 * (handles AVIF and other types stored only as image/avif in metadata).
 */
async function filterToImageRefs(
  refs: StorageReference[]
): Promise<StorageReference[]> {
  const out: StorageReference[] = [];
  for (const ref of refs) {
    if (IMAGE_EXT.test(ref.name)) {
      out.push(ref);
      continue;
    }
    try {
      const meta = await getMetadata(ref);
      const ct = meta.contentType ?? "";
      if (ct.startsWith("image/")) {
        out.push(ref);
      }
    } catch {
      /* not readable or not an image */
    }
  }
  return out;
}

export interface UseStorageFolderSlideUrlsOptions {
  imageOnly?: boolean;
  /** Include images in subfolders (default false for display; use true for cms/wedding-hall) */
  recursive?: boolean;
}

export function useStorageFolderSlideUrls(
  path: string,
  options: UseStorageFolderSlideUrlsOptions = {}
) {
  const { imageOnly = true, recursive = false } = options;
  const urls = ref<string[]>([]);
  const pending = ref(true);
  const loadError = ref<unknown>(null);

  async function refresh() {
    const storage = useFirebaseStorage();
    loadError.value = null;
    if (!storage) {
      urls.value = [];
      pending.value = false;
      if (import.meta.dev) {
        console.warn("[useStorageFolderSlideUrls] useFirebaseStorage() is undefined");
      }
      return;
    }
    pending.value = true;
    try {
      const normalized = normalizePath(path);
      const dirRef = storageRef(storage, normalized);

      let refs: StorageReference[];
      if (recursive) {
        refs = await listAllFilesRecursive(dirRef);
        if (imageOnly) {
          refs = await filterToImageRefs(refs);
        }
      } else {
        const res = await listAll(dirRef);
        refs = [...res.items];
        if (imageOnly) {
          refs = await filterToImageRefs(refs);
        }
      }

      refs.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      );
      urls.value = await Promise.all(refs.map((r) => getDownloadURL(r)));
    } catch (e) {
      loadError.value = e;
      if (import.meta.dev) {
        console.warn(`[useStorageFolderSlideUrls] ${path}`, e);
      }
      urls.value = [];
    } finally {
      pending.value = false;
    }
  }

  onMounted(() => {
    void refresh();
    const retries = [400, 900, 2000, 4000];
    for (const ms of retries) {
      setTimeout(() => {
        if (!urls.value.length) void refresh();
      }, ms);
    }
  });

  return { urls, pending, loadError, refresh };
}
