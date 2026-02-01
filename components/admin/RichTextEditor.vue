<template>
  <div class="rich-text-editor rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
    <!-- Toolbar -->
    <div
      v-if="editor"
      class="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
    >
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        :color="editor.isActive('bold') ? 'primary' : 'gray'"
        label="B"
        class="font-bold min-w-8"
        aria-label="Bold"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        :color="editor.isActive('italic') ? 'primary' : 'gray'"
        label="I"
        class="italic min-w-8"
        aria-label="Italic"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        :color="editor.isActive('strike') ? 'primary' : 'gray'"
        icon="i-heroicons-minus"
        aria-label="Strikethrough"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <span class="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        :color="editor.isActive('bulletList') ? 'primary' : 'gray'"
        icon="i-heroicons-list-bullet"
        aria-label="Bullet list"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        :color="editor.isActive('orderedList') ? 'primary' : 'gray'"
        icon="i-heroicons-numbered-list"
        aria-label="Numbered list"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <span class="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        :color="editor.isActive({ level: 2 }) ? 'primary' : 'gray'"
        icon="i-heroicons-document-text"
        aria-label="Heading"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <UButton
        type="button"
        variant="ghost"
        size="xs"
        color="gray"
        icon="i-heroicons-bars-3-bottom-left"
        aria-label="Paragraph"
        @click="editor.chain().focus().setParagraph().run()"
      />
    </div>
    <!-- Editor content -->
    <EditorContent :editor="editor" class="prose prose-sm dark:prose-invert max-w-none p-4 min-h-[120px]" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  extensions: [StarterKit],
  content: props.modelValue || '<p></p>',
  editorProps: {
    attributes: {
      class: 'focus:outline-none min-h-[100px]'
    }
  },
  onUpdate: ({ editor }: { editor: { getHTML: () => string } }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(
  () => props.modelValue,
  (html: string) => {
    if (!editor.value) return
    const current = editor.value.getHTML()
    if (html !== current) {
      editor.value.commands.setContent(html || '<p></p>', false)
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.rich-text-editor :deep(.ProseMirror) {
  min-height: 100px;
}

.rich-text-editor :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #9ca3af;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
