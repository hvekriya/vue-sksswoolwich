<template>
    <div class="h-screen overflow-y-auto overflow-x-hidden">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// Ensure standard meta setup
useHead({
    titleTemplate: (title) => title ? `${title} | Woolwich Temple` : 'Woolwich Temple | Shree KS Swaminarayan Temple Woolwich',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
})
</script>
