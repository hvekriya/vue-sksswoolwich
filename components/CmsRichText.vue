<template>
  <component :is="wrapperTag" v-if="wrapperTag" class="cms-rich-text">
    <template v-for="(block, i) in blocks" :key="i">
      <component
        :is="tagFor(block.type)"
        v-if="block.text != null"
        class="cms-rich-text__block"
      >
        <template v-if="block.spans?.length">
          <span
            v-for="(segment, j) in segments(block)"
            :key="j"
          >
            <a
              v-if="segment.link"
              :href="segment.link"
              target="_blank"
              rel="noopener noreferrer"
            >{{ segment.text }}</a>
            <template v-else>{{ segment.text }}</template>
          </span>
        </template>
        <template v-else>{{ block.text }}</template>
      </component>
    </template>
  </component>
  <template v-else>
    <template v-for="(block, i) in blocks" :key="i">
      <component
        :is="tagFor(block.type)"
        v-if="block.text != null"
        class="cms-rich-text__block"
      >
        <template v-if="block.spans?.length">
          <span
            v-for="(segment, j) in segments(block)"
            :key="j"
          >
            <a
              v-if="segment.link"
              :href="segment.link"
              target="_blank"
              rel="noopener noreferrer"
            >{{ segment.text }}</a>
            <template v-else>{{ segment.text }}</template>
          </span>
        </template>
        <template v-else>{{ block.text }}</template>
      </component>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { RichTextBlock } from '~/types/cms'

const props = withDefaults(
  defineProps<{
    /** Array of blocks (type, text, spans?) – CMS/Prismic-compatible */
    field?: RichTextBlock[] | null
    /** Optional wrapper element (e.g. 'div'). Omit for fragment. */
    wrapper?: string
  }>(),
  { field: () => [], wrapper: '' }
)

const wrapperTag = computed(() => props.wrapper || '')

const blocks = computed(() => {
  const f = props.field
  if (!Array.isArray(f) || !f.length) return []
  return f.filter((b) => b && typeof b.text === 'string')
})

function tagFor(blockType: string): string {
  const map: Record<string, string> = {
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    paragraph: 'p',
    'list-item': 'li',
    'olist-item': 'li',
    preformatted: 'pre',
  }
  return map[blockType] || 'p'
}

/** Split block text by spans into segments with optional link URL */
function segments(block: RichTextBlock): Array<{ text: string; link?: string }> {
  const text = block.text ?? ''
  const spans = block.spans ?? []
  if (!spans.length) return [{ text }]
  const linkSpans = spans
    .filter((s) => s.type === 'link' && (s.data as { url?: string })?.url)
    .map((s) => ({
      start: s.start,
      end: s.end,
      url: (s.data as { url: string }).url,
    }))
    .sort((a, b) => a.start - b.start)
  if (!linkSpans.length) return [{ text }]
  const out: Array<{ text: string; link?: string }> = []
  let pos = 0
  for (const span of linkSpans) {
    if (span.start > pos) {
      out.push({ text: text.slice(pos, span.start) })
    }
    out.push({ text: text.slice(span.start, span.end), link: span.url })
    pos = span.end
  }
  if (pos < text.length) out.push({ text: text.slice(pos) })
  return out
}
</script>
