<template>
  <AdminLayout>
    <div class="max-w-3xl space-y-8">
      <div class="flex items-center gap-4">
        <UButton
          to="/admin/cms"
          variant="ghost"
          color="gray"
          icon="i-heroicons-arrow-left"
          class="rounded-full"
        />
        <div>
          <h1 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            Home Page
          </h1>
          <p class="text-sm text-gray-500">Hero, alert and live stream. Changes appear on the homepage.</p>
        </div>
      </div>

      <UCard v-if="loading" class="rounded-2xl">
        <div class="flex items-center justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-golden-500" />
        </div>
      </UCard>

      <UCard v-else class="rounded-2xl">
        <form class="space-y-6" @submit.prevent="save">
          <UFormGroup label="Hero image">
            <AdminCmsImageUpload
              v-model="form.hero_image_url"
              storage-folder="cms_home"
              storage-doc-id="home"
              field-name="hero"
            />
          </UFormGroup>
          <UFormGroup label="Hero image alt text">
            <UInput v-model="form.hero_image_alt" placeholder="Alt text for hero image" size="lg" class="rounded-xl" />
          </UFormGroup>

          <UFormGroup label="Hero title">
            <AdminRichTextEditor
              v-model="form.hero_title"
              placeholder="Main heading on the hero"
            />
          </UFormGroup>
          <UFormGroup label="Hero description">
            <AdminRichTextEditor
              v-model="form.hero_description"
              placeholder="Short text under the hero"
            />
          </UFormGroup>

          <UFormGroup label="Alert message (optional)">
            <AdminRichTextEditor
              v-model="form.alert_message"
              placeholder="Site-wide alert shown above content. Leave empty to hide."
            />
          </UFormGroup>

          <UFormGroup label="Live stream URL (optional)">
            <UInput
              v-model="form.live_stream_url"
              placeholder="https://youtube.com/..."
              size="lg"
              class="rounded-xl"
            />
            <template #hint>
              Shown on the homepage when provided.
            </template>
          </UFormGroup>

          <div class="flex gap-4 pt-4">
            <UButton
              type="submit"
              color="golden"
              size="lg"
              :loading="saving"
              class="rounded-full"
            >
              Save Changes
            </UButton>
            <UButton to="/admin/cms" variant="ghost" color="gray" class="rounded-full">
              Cancel
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import type { HomeDataFlat } from '~/lib/cms-flatten'
import { homeDataToFlat } from '~/lib/cms-flatten'
import { htmlToBlocks } from '~/lib/cms-normalize'

definePageMeta({ middleware: 'auth' })

const toast = useToast()
const cms = useCms()
const cmsAdmin = useCmsAdmin()

const form = reactive<HomeDataFlat>({
  hero_image_url: '',
  hero_image_alt: '',
  hero_title: '',
  hero_description: '',
  alert_message: '',
  live_stream_url: '',
})

const loading = ref(true)
const saving = ref(false)

async function load() {
  loading.value = true
  try {
    const doc = await cms.getHome()
    if (doc?.data) {
      const flat = homeDataToFlat(doc.data as import('~/types/cms').HomeData)
      form.hero_image_url = flat.hero_image_url
      form.hero_image_alt = flat.hero_image_alt
      form.hero_title = flat.hero_title
      form.hero_description = flat.hero_description
      form.alert_message = flat.alert_message
      form.live_stream_url = flat.live_stream_url
    }
  } finally {
    loading.value = false
  }
}

function buildBody(): import('~/types/cms').HomeSlice[] {
  const body: import('~/types/cms').HomeSlice[] = []

  body.push({
    slice_type: 'hero_section',
    primary: {
      image: {
        url: form.hero_image_url || '',
        alt: form.hero_image_alt || undefined,
      },
      title: htmlToBlocks(form.hero_title),
      description: htmlToBlocks(form.hero_description),
    },
  })

  if (form.alert_message?.trim()) {
    body.push({
      slice_type: 'alert',
      slice_label: 'alert',
      primary: {
        alert_message: htmlToBlocks(form.alert_message),
      },
    })
  }

  if (form.live_stream_url?.trim()) {
    body.push({
      slice_type: 'video',
      primary: {
        live_stream_enabled: true,
        live_stream_link: { url: form.live_stream_url.trim() },
      },
    })
  }

  return body
}

async function save() {
  saving.value = true
  try {
    const body = buildBody()
    await cmsAdmin.saveHome({
      body,
      live_stream_url: form.live_stream_url?.trim() || undefined,
    })
    toast.add({ title: 'Home page saved', color: 'green' })
  } catch (e: any) {
    toast.add({ title: e?.message || 'Failed to save', color: 'red' })
  } finally {
    saving.value = false
  }
}

onMounted(load)

useHead({ title: 'Home Page | CMS | Admin' })
</script>
