<template>
  <div class="wedding-hall-page">
    <!-- Hero: full-bleed Storage slider + title overlay (under floating nav) -->
    <section
      class="hero-under-nav relative min-h-[68vh] w-full overflow-hidden lg:min-h-[75vh]"
    >
      <div class="absolute inset-0 z-0">
        <WeddingHallSlider hero class="h-full w-full" />
      </div>
      <!-- Readability over slides -->
      <div
        class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-900/35"
      />
      <!-- Match PageHero / ImageSlider: clear floating header + notch (pt-48 was too tight) -->
      <UContainer
        class="relative z-10 flex min-h-[68vh] flex-col justify-end px-4 pb-16 text-center lg:min-h-[75vh] lg:pb-24 pt-[max(16rem,calc(env(safe-area-inset-top,0px)+12rem))] lg:pt-[max(18rem,calc(env(safe-area-inset-top,0px)+13.5rem))]"
      >
        <div class="mx-auto max-w-3xl">
          <h1
            class="mb-5 text-5xl font-serif font-bold leading-tight tracking-tight text-white drop-shadow-md lg:text-7xl"
          >
            {{ weddingTitleBefore
            }}<span class="text-golden-400">{{ weddingTitleAccent }}</span>
          </h1>
          <p
            class="mx-auto max-w-2xl text-lg font-light leading-relaxed text-gray-200/95 drop-shadow"
          >
            {{ heroLead }}
          </p>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-16 lg:py-24">
      <div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <div
            v-if="hasRichContent && doc"
            class="prose prose-xl prose-golden max-w-none dark:prose-invert wedding-hall-prose"
          >
            <CmsRichText :field="doc.data.content" />
          </div>
          <div
            v-else
            class="prose prose-xl prose-golden max-w-none dark:prose-invert wedding-hall-prose"
          >
            <h2>Your celebration at the Mandir</h2>
            <p>
              Rukmani Nivas offers a dignified, spacious setting for weddings, receptions,
              and family events. Our team works with you to honour tradition while making
              practical arrangements for your guests.
            </p>
            <p>
              Add your main copy in
              <strong class="text-golden-600"
                >Admin → CMS → Our temple → wedding-hall</strong
              >
              (Content field).
            </p>
          </div>

          <div class="mt-12 flex flex-wrap gap-4">
            <UButton
              v-if="ctaVisible"
              :to="ctaUrl"
              size="xl"
              color="golden"
              class="rounded-full px-10 py-4 text-lg font-bold shadow-xl shadow-golden-500/10"
            >
              {{ ctaLabel }}
            </UButton>
          </div>
        </div>

        <div class="space-y-8 lg:sticky lg:top-32 lg:col-span-4">
          <div
            v-if="doc?.data?.icon?.url"
            class="flex flex-col items-center rounded-[2.5rem] border border-golden-500/10 bg-white p-8 text-center shadow-xl dark:bg-gray-900"
          >
            <div
              class="mb-6 flex h-36 w-36 items-center justify-center rounded-3xl bg-golden-50 dark:bg-golden-950/30"
            >
              <img
                :src="doc.data.icon.url"
                :alt="doc.data.icon.alt || ''"
                class="h-24 w-auto object-contain drop-shadow-lg"
              />
            </div>
            <p class="text-sm italic leading-relaxed text-gray-500 dark:text-gray-400">
              Rukmani Nivas at Woolwich Mandir — a blessed setting for your sacred day.
            </p>
          </div>

          <div
            class="rounded-[2.5rem] border border-golden-100 bg-golden-50 p-8 dark:border-golden-500/10 dark:bg-golden-950/30"
          >
            <UIcon name="i-heroicons-sparkles" class="mb-6 h-10 w-10 text-golden-600" />
            <h3 class="mb-4 font-serif text-xl font-bold text-gray-900 dark:text-white">
              Temple wedding venue
            </h3>
            <p class="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Our hall offers a serene, auspicious space with modern amenities and
              traditional sanctity — ideal for weddings and celebrations.
            </p>
            <ul class="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              <li class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="shrink-0 text-golden-600" />
                Large capacity
              </li>
              <li class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="shrink-0 text-golden-600" />
                Audio-visual setup
              </li>
              <li class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="shrink-0 text-golden-600" />
                Dedicated parking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Contact CTA: same max width as card so headline + form align -->
    <section
      class="border-t border-gray-200/60 bg-gray-50/80 py-16 dark:border-white/10 dark:bg-gray-950/40 lg:py-24"
      aria-labelledby="wedding-contact-heading"
    >
      <UContainer>
        <div class="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <h2
            id="wedding-contact-heading"
            class="mb-4 font-serif text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Ready to start planning?
          </h2>
          <p
            class="mx-auto max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Contact our dedicated events team to check availability and arrange a viewing.
          </p>
        </div>
        <div class="mx-auto max-w-6xl">
          <WeddingContact />
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { RichTextBlock } from "~/types/cms";

const cms = useCms();

const { data: doc, refresh: refreshWeddingDoc } = await useAsyncData("wedding-hall", () =>
  cms.getOurTempleByUid("wedding-hall")
);

// Firestore often unavailable on SSR; retry on client so CMS content can appear
onMounted(async () => {
  if (!doc.value) {
    await refreshWeddingDoc();
  }
});

const pageTitle = computed(
  () => doc.value?.data?.title?.[0]?.text?.trim() || "Wedding Hall"
);

const weddingTitleParts = computed(() => {
  const words = pageTitle.value.split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return { before: "", accent: pageTitle.value };
  }
  return {
    before: `${words.slice(0, -1).join(" ")} `,
    accent: words[words.length - 1] ?? "",
  };
});
const weddingTitleBefore = computed(() => weddingTitleParts.value.before);
const weddingTitleAccent = computed(() => weddingTitleParts.value.accent);

const heroLead = computed(() => {
  const blocks = doc.value?.data?.content;
  const first = blocks?.map((b: RichTextBlock) => b.text?.trim()).find(Boolean);
  if (first) {
    return first.length > 240 ? `${first.slice(0, 237)}…` : first;
  }
  return "Rukmani Nivas — an exclusive luxury wedding and events venue in the heart of South East London.";
});

const hasRichContent = computed(() => {
  const c = doc.value?.data?.content;
  return Array.isArray(c) && c.some((b: RichTextBlock) => Boolean(b?.text?.trim()));
});

const ctaUrl = computed(() => doc.value?.data?.cta_link?.url ?? "");
const ctaLabel = computed(
  () => doc.value?.data?.cta_text?.[0]?.text?.trim() || "Book now"
);
const ctaVisible = computed(() => Boolean(ctaUrl.value));

function richTextPlain(blocks: RichTextBlock[] | undefined): string {
  if (!blocks?.length) return "";
  return blocks
    .map((b) => b.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const seoDescription = computed(() => {
  const plain = richTextPlain(doc.value?.data?.content);
  if (plain) return plain.slice(0, 160);
  return heroLead.value.slice(0, 160);
});

useHead(() => ({
  title: `${pageTitle.value} | Woolwich Temple`,
  meta: [{ name: "description", content: seoDescription.value }],
}));
</script>

<style scoped>
.wedding-hall-prose :deep(p) {
  @apply mb-8 leading-relaxed opacity-90;
}

.wedding-hall-prose :deep(h2),
.wedding-hall-prose :deep(h3) {
  @apply mt-12 mb-6 font-serif font-bold text-gray-900 dark:text-white;
}

.wedding-hall-prose :deep(ul) {
  @apply my-8 space-y-4;
}

.wedding-hall-prose :deep(li) {
  @apply flex gap-3;
}

.wedding-hall-prose :deep(li)::before {
  content: "✦";
  @apply shrink-0 font-bold text-golden-500;
}
</style>
