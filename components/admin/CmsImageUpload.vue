<template>
  <div class="space-y-3">
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
        <p class="text-xs text-gray-500 mt-1">Or upload a new image to replace.</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'

const props = withDefaults(
  defineProps<{
    modelValue: string
    /** e.g. "events" */
    storageFolder: string
    /** e.g. event uid; use empty for new docs (uploads to cms/uploads/) */
    storageDocId?: string
    /** e.g. "poster" or "poster_2" - used in file path */
    fieldName?: string
  }>(),
  { storageDocId: '', fieldName: 'image' }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const storage = useFirebaseStorage()
const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const dragOver = ref(false)
const imageError = ref(false)
const toast = useToast()

function launchFilePicker() {
  fileInputRef.value?.click()
}

function clear() {
  emit('update:modelValue', '')
  imageError.value = false
}

const MAX_DIMENSION = 1920
const JPEG_QUALITY = 0.85
const PNG_QUALITY = 0.9

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
    const quality = mime === 'image/png' ? PNG_QUALITY : JPEG_QUALITY

    return new Promise((resolve, reject) => {
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
