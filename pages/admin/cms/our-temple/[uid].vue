<template>
  <AdminLayout>
    <div class="max-w-3xl space-y-8">
      <div class="flex items-center gap-4">
        <UButton
          to="/admin/cms/our-temple"
          variant="ghost"
          color="gray"
          icon="i-heroicons-arrow-left"
          class="rounded-full"
        />
        <div>
          <h1 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            {{ isNew ? 'New Page' : `Edit: ${uid}` }}
          </h1>
          <p class="text-sm text-gray-500">/our-temple/{{ form.uid || uid }}</p>
        </div>
      </div>

      <UCard class="rounded-2xl">
        <form class="space-y-6" @submit.prevent="save">
          <UFormGroup label="Page title" required>
            <UInput v-model="form.title" placeholder="e.g. Wedding Hall" size="lg" class="rounded-xl" />
            <template v-if="isNew" #hint>
              URL slug is generated from the title (editable below).
            </template>
          </UFormGroup>

          <UFormGroup v-if="isNew" label="URL slug" required>
            <UInput
              v-model="form.uid"
              placeholder="wedding-hall"
              size="lg"
              class="rounded-xl"
              :class="{ 'ring-2 ring-red-500': slugExists }"
            />
            <template #hint>
              Used in the URL: /our-temple/{{ form.uid || 'slug' }}
              <span v-if="slugExists" class="block text-red-600 dark:text-red-400 font-medium mt-1">
                This slug is already in use. Choose another.
              </span>
            </template>
          </UFormGroup>

          <UFormGroup label="Content">
            <AdminRichTextEditor
              v-model="form.content"
              placeholder="Main page content (bold, lists, headings)"
            />
          </UFormGroup>

          <UFormGroup label="Cover image">
            <AdminCmsImageUpload
              v-model="form.cover_image_url"
              storage-folder="our_temple"
              :storage-doc-id="uid"
              field-name="cover"
            />
          </UFormGroup>
          <UFormGroup label="Cover image alt">
            <UInput v-model="form.cover_image_alt" placeholder="Alt text" size="lg" class="rounded-xl" />
          </UFormGroup>

          <UFormGroup label="CTA button URL">
            <UInput v-model="form.cta_link_url" placeholder="https://..." size="lg" class="rounded-xl" />
          </UFormGroup>
          <UFormGroup label="CTA button text">
            <UInput v-model="form.cta_text" placeholder="e.g. Book Now" size="lg" class="rounded-xl" />
          </UFormGroup>

          <div class="flex gap-4 pt-4">
            <UButton
              type="submit"
              color="golden"
              size="lg"
              :loading="saving"
              class="rounded-full"
            >
              {{ isNew ? 'Create Page' : 'Save Changes' }}
            </UButton>
            <UButton to="/admin/cms/our-temple" variant="ghost" color="gray" class="rounded-full">
              Cancel
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import type { OurTempleDataFlat } from '~/types/cms'
import { ourTempleDataToFlat } from '~/lib/cms-flatten'
import { titleToSlug } from '~/lib/slug'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const toast = useToast()
const uid = computed(() => route.params.uid as string)
const isNew = computed(() => uid.value === 'new')

const cms = useCms()
const cmsAdmin = useCmsAdmin()

const form = reactive<OurTempleDataFlat>({
  uid: '',
  title: '',
  content: '',
  cover_image_url: '',
  cover_image_alt: '',
  icon_url: '',
  icon_alt: '',
  cta_link_url: '',
  cta_text: '',
})

const { data: doc } = await useAsyncData(
  `admin-our-temple-${uid.value}`,
  () => (isNew.value ? Promise.resolve(null) : cms.getOurTempleByUid(uid.value)),
  { watch: [uid] }
)

watch(
  doc,
  (d: typeof doc.value) => {
    if (!d || isNew.value) return
    Object.assign(form, ourTempleDataToFlat(d.data, d.uid))
  },
  { immediate: true }
)

// Auto-fill slug from title when creating new
watch(
  () => form.title,
  (title: string) => {
    if (isNew.value && title) form.uid = titleToSlug(title)
  }
)

const slugExists = ref(false)
watch(
  () => form.uid,
  async (slug: string) => {
    if (!isNew.value || !slug?.trim()) {
      slugExists.value = false
      return
    }
    const s = titleToSlug(slug) || slug.trim().toLowerCase().replace(/\s+/g, '-')
    if (!s) {
      slugExists.value = false
      return
    }
    try {
      const existing = await cms.getOurTempleByUid(s)
      slugExists.value = !!existing
    } catch {
      slugExists.value = false
    }
  },
  { immediate: true }
)

const saving = ref(false)
async function save() {
  if (!form.title?.trim()) {
    toast.add({ title: 'Enter a title', color: 'red' })
    return
  }
  const slug = isNew.value ? titleToSlug(form.uid || form.title) : uid.value
  if (!slug) {
    toast.add({ title: 'Enter a URL slug (or page title)', color: 'red' })
    return
  }
  if (isNew.value) {
    const existing = await cms.getOurTempleByUid(slug)
    if (existing) {
      toast.add({ title: 'This slug is already in use. Choose a different slug or title.', color: 'red' })
      return
    }
  }
  saving.value = true
  try {
    await cmsAdmin.saveOurTemple(slug, { ...form, uid: slug })
    toast.add({ title: isNew.value ? 'Page created' : 'Page updated', color: 'green' })
    if (isNew.value) await router.replace(`/admin/cms/our-temple/${slug}`)
  } catch (e: any) {
    toast.add({ title: e?.message || 'Failed to save', color: 'red' })
  } finally {
    saving.value = false
  }
}

useHead({ title: () => (isNew.value ? 'New Page' : `Edit ${uid.value}`) + ' | CMS Admin' })
</script>
