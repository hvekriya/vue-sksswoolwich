<template>
  <div class="space-y-4">
    <input
      ref="fileInputRef"
      type="file"
      accept="image/jpeg, image/png, image/webp, image/gif"
      class="hidden"
      @change="onFileSelected"
    />

    <div v-if="modelValue" class="flex flex-wrap items-start gap-4">
      <div class="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <img
          :src="modelValue"
          alt="Preview"
          class="w-40 h-28 object-cover"
          @error="imageError = true"
        />
        <div
          v-if="!imageError"
          class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
        >
          <UButton
            type="button"
            icon="i-heroicons-arrow-path"
            size="xs"
            color="white"
            variant="soft"
            :loading="uploading"
            @click="launchFilePicker"
          >
            Replace
          </UButton>
          <UButton
            type="button"
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            variant="soft"
            @click="clear"
          >
            Remove
          </UButton>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <UInput
          :model-value="modelValue"
          placeholder="Image URL"
          size="md"
          class="rounded-xl font-mono text-sm"
          @update:model-value="emit('update:modelValue', $event)"
        />
        <p class="text-xs text-gray-500 mt-1">
          {{ enableLibrary ? 'Replace with a new upload or choose an existing poster below.' : 'Or upload a new image to replace.' }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transition-colors hover:border-golden-500/50 cursor-pointer"
      @click="launchFilePicker"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
      :class="{ 'border-golden-500/50 bg-golden-500/5': dragOver }"
    >
      <UIcon
        name="i-heroicons-photo"
        class="w-10 h-10 mx-auto text-gray-400 mb-2"
      />
      <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
        {{ uploading ? 'Uploading…' : 'Click or drop image to upload' }}
      </p>
      <p class="text-xs text-gray-500 mt-1">Images are compressed before upload. Stored in cms/</p>
      <UButton
        v-if="!uploading"
        type="button"
        variant="soft"
        color="golden"
        size="sm"
        class="mt-3 rounded-full"
        icon="i-heroicons-cloud-arrow-up"
        @click.stop="launchFilePicker"
      >
        Choose file
      </UButton>
    </div>

    <div v-if="enableLibrary" class="space-y-3">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ libraryLimit ? 'Last 5 uploaded posters' : 'Uploaded posters' }}
        </p>
        <UButton
          type="button"
          variant="ghost"
          color="gray"
          size="xs"
          icon="i-heroicons-arrow-path"
          :loading="libraryPending"
          class="rounded-full"
          @click="loadLibrary(true)"
        >
          Refresh
        </UButton>
      </div>

      <div v-if="libraryPending && !displayLibrary.length" class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        <USkeleton v-for="i in (libraryLimit || 5)" :key="i" class="aspect-[3/4] rounded-lg" />
      </div>

      <div v-else-if="displayLibrary.length" class="grid grid-cols-3 sm:grid-cols-5 gap-2 p-0.5">
        <button
          v-for="item in displayLibrary"
          :key="item.path"
          type="button"
          class="relative rounded-lg overflow-hidden border-2 bg-gray-50 dark:bg-gray-900 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-500"
          :class="isSelected(item.url)
            ? 'border-golden-500 ring-2 ring-golden-500/40'
            : 'border-transparent hover:border-golden-300'"
          :aria-pressed="isSelected(item.url)"
          :aria-label="isSelected(item.url) ? 'Currently selected poster' : 'Select this poster'"
          @click="selectLibraryImage(item.url)"
        >
          <img
            :src="item.url"
            alt=""
            class="w-full aspect-[3/4] object-cover"
          />
          <span
            v-if="isSelected(item.url)"
            class="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-golden-500 text-white shadow"
          >
            <UIcon name="i-heroicons-check" class="h-4 w-4" />
          </span>
        </button>
      </div>

      <p v-else class="text-xs text-gray-500 italic">
        No posters uploaded yet. Use “Choose file” above to add one.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  listAll,
  type StorageReference,
} from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'

type LibraryImage = { url: string; path: string; group: string; uploadedAt: number }

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|bmp)$/i

const FOLDER_LABELS: Record<string, string> = {
  'cms/events': 'Event posters',
  slideshow: 'TV slideshow',
  'pinned-posters': 'Pinned TV posters',
}

const libraryInflight = new Map<string, Promise<LibraryImage[]>>()
const libraryResults = new Map<string, LibraryImage[]>()

const props = withDefaults(
  defineProps<{
    modelValue: string
    /** e.g. "events" */
    storageFolder: string
    /** e.g. event uid; use empty for new docs (uploads to cms/uploads/) */
    storageDocId?: string
    /** e.g. "poster" or "poster_2" - used in file path */
    fieldName?: string
    /** Show a grid of already-uploaded images that can be selected */
    enableLibrary?: boolean
    /** Storage folders to list (defaults to cms/{storageFolder}) */
    libraryFolders?: string[]
    /** Extra image URLs to show in the library (e.g. posters already on events) */
    libraryUrls?: string[]
    /** Max posters to show (0 = all). Event picker uses 5. */
    libraryLimit?: number
  }>(),
  {
    storageDocId: '',
    fieldName: 'image',
    enableLibrary: false,
    libraryFolders: () => [],
    libraryUrls: () => [],
    libraryLimit: 5,
  }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const storage = useFirebaseStorage()
const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const dragOver = ref(false)
const imageError = ref(false)
const toast = useToast()

const libraryImages = ref<LibraryImage[]>([])
const libraryPending = ref(false)

const resolvedFolders = computed(() => {
  const folders = props.libraryFolders?.length
    ? props.libraryFolders
    : [`cms/${props.storageFolder}`]
  return folders.map((path) => {
    const normalized = path.replace(/^\/+|\/+$/g, '')
    return {
      path: normalized,
      label: FOLDER_LABELS[normalized] || normalized.split('/').filter(Boolean).pop() || 'Uploaded',
    }
  })
})

const cacheKey = computed(() =>
  `${resolvedFolders.value.map((f) => f.path).join('|')}:limit${props.libraryLimit || 0}`
)

const displayLibrary = computed(() => {
  const seen = new Set<string>()
  const merged: LibraryImage[] = []

  const push = (item: LibraryImage) => {
    const key = item.path || item.url
    if (seen.has(key)) return
    if (merged.some((m) => urlsMatch(m.url, item.url))) return
    seen.add(key)
    merged.push(item)
  }

  for (const img of libraryImages.value) push(img)
  ;(props.libraryUrls ?? []).forEach((url, i) => {
    if (!url) return
    push({
      url,
      path: `url:${url}`,
      group: 'Event posters',
      uploadedAt: 0 - i,
    })
  })

  merged.sort((a, b) => b.uploadedAt - a.uploadedAt)
  if (props.libraryLimit && props.libraryLimit > 0) {
    return merged.slice(0, props.libraryLimit)
  }
  return merged
})

function isSelected(url: string) {
  return !!props.modelValue && urlsMatch(props.modelValue, url)
}

function urlsMatch(a: string, b: string) {
  if (a === b) return true
  try {
    const ua = new URL(a)
    const ub = new URL(b)
    return ua.origin === ub.origin && ua.pathname === ub.pathname
  } catch {
    return false
  }
}

function selectLibraryImage(url: string) {
  emit('update:modelValue', url)
  imageError.value = false
}

async function listAllFilesRecursive(dirRef: StorageReference): Promise<StorageReference[]> {
  const res = await listAll(dirRef)
  const nested = await Promise.all(res.prefixes.map((p) => listAllFilesRecursive(p)))
  return [...res.items, ...nested.flat()]
}

async function fetchLibrary(folders: { path: string; label: string }[]): Promise<LibraryImage[]> {
  if (!storage) return []

  type DatedRef = { ref: StorageReference; group: string; uploadedAt: number }
  const dated: DatedRef[] = []

  for (const folder of folders) {
    try {
      const dirRef = storageRef(storage, folder.path)
      const refs = (await listAllFilesRecursive(dirRef)).filter((r) => IMAGE_EXT.test(r.name))
      const withTime = await Promise.all(
        refs.map(async (r) => {
          let uploadedAt = 0
          try {
            const meta = await getMetadata(r)
            uploadedAt = Date.parse(meta.updated || meta.timeCreated || '') || 0
          } catch {
            /* keep 0 */
          }
          return { ref: r, group: folder.label, uploadedAt }
        })
      )
      dated.push(...withTime)
    } catch (err) {
      if (import.meta.dev) {
        console.warn(`[CmsImageUpload] library folder ${folder.path}`, err)
      }
    }
  }

  dated.sort((a, b) => b.uploadedAt - a.uploadedAt)
  const picked = props.libraryLimit > 0 ? dated.slice(0, props.libraryLimit) : dated

  return Promise.all(
    picked.map(async (item) => ({
      url: await getDownloadURL(item.ref),
      path: item.ref.fullPath,
      group: item.group,
      uploadedAt: item.uploadedAt,
    }))
  )
}

async function loadLibrary(force = false) {
  if (!props.enableLibrary) return
  const key = cacheKey.value
  if (force) {
    libraryInflight.delete(key)
    libraryResults.delete(key)
  }
  if (libraryResults.has(key) && !force) {
    libraryImages.value = libraryResults.get(key) ?? []
    return
  }
  libraryPending.value = true
  try {
    let promise = libraryInflight.get(key)
    if (!promise) {
      promise = fetchLibrary(resolvedFolders.value)
      libraryInflight.set(key, promise)
    }
    const images = await promise
    libraryResults.set(key, images)
    libraryImages.value = images
  } finally {
    libraryPending.value = false
  }
}

onMounted(() => {
  if (props.enableLibrary) void loadLibrary()
})

watch(cacheKey, () => {
  if (props.enableLibrary) void loadLibrary()
})

function launchFilePicker() {
  fileInputRef.value?.click()
}

function clear() {
  emit('update:modelValue', '')
  imageError.value = false
}

const MAX_DIMENSION = 1920
const JPEG_QUALITY = 0.85

/** Load image file into HTMLImageElement */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

/** Resize dimensions to fit within maxDimension keeping aspect ratio */
function fitDimensions(
  width: number,
  height: number,
  maxDimension: number
): { width: number; height: number } {
  if (width <= maxDimension && height <= maxDimension) return { width, height }
  const r = width / height
  return r >= 1
    ? { width: maxDimension, height: Math.round(maxDimension / r) }
    : { width: Math.round(maxDimension * r), height: maxDimension }
}

/** Compress image: resize to max 1920px and reduce quality for JPEG/WebP */
async function compressImage(file: File): Promise<{ blob: Blob; mime: string; ext: string }> {
  const img = await loadImage(file)
  try {
    const { width: w, height: h } = fitDimensions(img.naturalWidth, img.naturalHeight, MAX_DIMENSION)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return { blob: file, mime: file.type, ext: getExtension(file) }
    ctx.drawImage(img, 0, 0, w, h)

    const mime = file.type?.toLowerCase() || 'image/jpeg'
    const useQuality = mime === 'image/jpeg' || mime === 'image/jpg' || mime === 'image/webp'

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({ blob: file, mime: file.type, ext: getExtension(file) })
            return
          }
          const outMime = useQuality ? 'image/jpeg' : mime
          const ext = useQuality ? 'jpg' : getExtension(file)
          resolve({ blob, mime: outMime, ext })
        },
        useQuality ? 'image/jpeg' : mime,
        useQuality ? JPEG_QUALITY : undefined
      )
    })
  } finally {
    URL.revokeObjectURL(img.src)
  }
}

function getExtension(file: File): string {
  const mime = file.type?.toLowerCase()
  if (mime === 'image/jpeg' || mime === 'image/jpg') return 'jpg'
  if (mime === 'image/png') return 'png'
  if (mime === 'image/webp') return 'webp'
  if (mime === 'image/gif') return 'gif'
  const name = file.name?.split('.').pop()?.toLowerCase()
  return name && /^[a-z0-9]+$/i.test(name) ? name : 'jpg'
}

async function uploadFile(file: File) {
  const { blob, mime, ext } = await compressImage(file)
  const docId = props.storageDocId || 'uploads'
  const field = (props.fieldName || 'image').replace(/[^a-z0-9_]/gi, '_')
  const filename = props.storageDocId ? `${field}.${ext}` : `${Date.now()}-${field}.${ext}`
  const path = `cms/${props.storageFolder}/${docId}/${filename}`

  const ref = storageRef(storage, path)
  await uploadBytes(ref, blob, { contentType: mime })
  const url = await getDownloadURL(ref)
  emit('update:modelValue', url)
  if (props.enableLibrary) void loadLibrary(true)
}

function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    toast.add({ title: 'Please choose an image file', color: 'red' })
    input.value = ''
    return
  }
  uploading.value = true
  uploadFile(file)
    .then(() => toast.add({ title: 'Image uploaded', color: 'green' }))
    .catch((err) => {
      console.error(err)
      toast.add({ title: 'Upload failed', description: err?.message, color: 'red' })
    })
    .finally(() => {
      uploading.value = false
      input.value = ''
      fileInputRef.value && (fileInputRef.value.value = '')
    })
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (!file?.type.startsWith('image/')) return
  uploading.value = true
  uploadFile(file)
    .then(() => toast.add({ title: 'Image uploaded', color: 'green' }))
    .catch((err) => {
      console.error(err)
      toast.add({ title: 'Upload failed', color: 'red' })
    })
    .finally(() => (uploading.value = false))
}

watch(() => props.modelValue, () => { imageError.value = false })
</script>
