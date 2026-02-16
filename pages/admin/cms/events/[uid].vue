<template>
  <AdminLayout>
    <div class="max-w-3xl space-y-8">
      <div class="flex items-center gap-4">
        <UButton
          to="/admin/cms/events"
          variant="ghost"
          color="gray"
          icon="i-heroicons-arrow-left"
          class="rounded-full"
        />
        <div>
          <h1 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            {{ isNew ? 'New Event' : 'Edit Event' }}
          </h1>
          <p class="text-sm text-gray-500">Changes appear on the website.</p>
        </div>
      </div>

      <UCard class="rounded-2xl">
        <form class="space-y-6" @submit.prevent="save">
          <UFormGroup label="Event title" required>
            <UInput v-model="form.event_title" placeholder="Event name" size="lg" class="rounded-xl" />
            <template v-if="isNew" #hint>
              URL slug is generated from the title (editable below).
            </template>
          </UFormGroup>

          <UFormGroup v-if="isNew" label="URL slug" required>
            <UInput
              v-model="form.uid"
              placeholder="diwali-2025"
              size="lg"
              class="rounded-xl"
              :class="{ 'ring-2 ring-red-500': slugExists }"
            />
            <template #hint>
              Used in the URL: /events/{{ form.uid || 'slug' }}
              <span v-if="slugExists" class="block text-red-600 dark:text-red-400 font-medium mt-1">
                This slug is already in use. Choose another.
              </span>
            </template>
          </UFormGroup>

          <UFormGroup label="Date" required>
            <UInput v-model="form.event_date" type="date" size="lg" class="rounded-xl" />
          </UFormGroup>

          <UFormGroup label="Location">
            <UInput v-model="form.event_location" placeholder="e.g. Main Hall" size="lg" class="rounded-xl" />
          </UFormGroup>

          <UFormGroup label="Short description (cards)">
            <UTextarea
              v-model="form.event_description_short"
              placeholder="One or two lines for event cards"
              :rows="2"
              class="rounded-xl"
            />
          </UFormGroup>

          <UFormGroup label="Full description">
            <AdminRichTextEditor
              v-model="form.event_description"
              placeholder="Full event description (bold, lists, headings)"
            />
          </UFormGroup>

          <UFormGroup label="Poster image">
            <AdminCmsImageUpload
              v-model="form.poster_url"
              storage-folder="events"
              :storage-doc-id="isNew ? '' : uidParam"
              field-name="poster"
            />
          </UFormGroup>
          <UFormGroup label="Poster alt text">
            <UInput v-model="form.poster_alt" placeholder="Alt text" size="lg" class="rounded-xl" />
          </UFormGroup>

          <UFormGroup label="Second poster image">
            <AdminCmsImageUpload
              v-model="form.poster_2_url"
              storage-folder="events"
              :storage-doc-id="isNew ? '' : uidParam"
              field-name="poster_2"
            />
          </UFormGroup>

          <UFormGroup label="Flickr photoset ID (optional)">
            <UInput v-model="form.flickr_photoset_id" placeholder="e.g. 721577..." size="lg" class="rounded-xl" />
          </UFormGroup>

          <div class="flex gap-4 pt-4">
            <UButton
              type="submit"
              color="golden"
              size="lg"
              :loading="saving"
              class="rounded-full"
            >
              {{ isNew ? 'Create Event' : 'Save Changes' }}
            </UButton>
            <UButton
              v-if="!isNew"
              to="/admin/cms/events"
              variant="ghost"
              color="gray"
              class="rounded-full"
            >
              Cancel
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import type { EventDataFlat } from '~/types/cms'
import { eventDataToFlat } from '~/lib/cms-flatten'
import { titleToSlug } from '~/lib/slug'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const toast = useToast()
const uidParam = computed(() => (route.params.uid as string) ?? '')
const isNew = computed(() => uidParam.value === 'new')

const cms = useCms()
const cmsAdmin = useCmsAdmin()

const form = reactive<EventDataFlat>({
  uid: '',
  event_title: '',
  event_date: '',
  event_location: '',
  event_description: '',
  event_description_short: '',
  poster_url: '',
  poster_alt: '',
  poster_2_url: '',
  poster_2_alt: '',
  flickr_photoset_id: '',
})

const { data: eventDoc } = await useAsyncData(
  `admin-event-${uidParam.value}`,
  () => (isNew.value ? Promise.resolve(null) : cms.getEventByUid(uidParam.value)),
  { watch: [uidParam] }
)

watch(
  eventDoc,
  (doc: typeof eventDoc.value) => {
    if (!doc || isNew.value) return
    const flat = eventDataToFlat(doc.data, doc.uid)
    Object.assign(form, flat)
  },
  { immediate: true }
)

// Auto-fill slug from event title when creating new
watch(
  () => form.event_title,
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
      const existing = await cms.getEventByUid(s)
      slugExists.value = !!existing
    } catch {
      slugExists.value = false
    }
  },
  { immediate: true }
)

const saving = ref(false)
async function save() {
  if (!form.event_title?.trim()) {
    toast.add({ title: 'Enter an event title', color: 'red' })
    return
  }
  if (!form.event_date) {
    toast.add({ title: 'Select a date', color: 'red' })
    return
  }
  const slug = isNew.value ? titleToSlug(form.uid || form.event_title) : uidParam.value
  if (!slug) {
    toast.add({ title: 'Enter a URL slug (or event title)', color: 'red' })
    return
  }
  if (isNew.value) {
    const existing = await cms.getEventByUid(slug)
    if (existing) {
      toast.add({ title: 'This slug is already in use. Choose a different slug or title.', color: 'red' })
      return
    }
  }
  saving.value = true
  try {
    await cmsAdmin.saveEvent(slug, { ...form, uid: slug })
    toast.add({ title: isNew.value ? 'Event created' : 'Event updated', color: 'green' })
    if (isNew.value) await router.replace(`/admin/cms/events/${slug}`)
  } catch (e: any) {
    toast.add({ title: e?.message || 'Failed to save', color: 'red' })
  } finally {
    saving.value = false
  }
}

useHead({ title: () => (isNew.value ? 'New Event' : 'Edit Event') + ' | CMS Admin' })
</script>
