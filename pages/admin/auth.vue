<template>
    <div class="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <!-- Abstract Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute -top-48 -left-48 w-96 h-96 bg-golden-500/20 rounded-full blur-[120px]"></div>
            <div class="absolute -bottom-48 -right-48 w-96 h-96 bg-temple-red-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div class="relative z-10 w-full max-w-md animate-fade-in">
            <div class="text-center mb-10">
                <img src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
                    class="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-golden-500/20 p-1"
                    alt="Woolwich Mandir" />
                <h1 class="text-3xl font-serif font-bold text-white mb-2">Management Portal</h1>
                <p class="text-gray-500 text-sm">Sign in to manage temple content and displays</p>
            </div>

            <UCard class="glass-effect rounded-[2.5rem] border-white/5 shadow-2xl p-4">
                <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
                    <UFormGroup label="Admin Email" name="email">
                        <UInput v-model="state.email" placeholder="admin@sksswoolwich.org" icon="i-heroicons-envelope"
                            size="xl" class="rounded-2xl" variant="outline" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="state.password" type="password" placeholder="••••••••"
                            icon="i-heroicons-lock-closed" size="xl" />
                    </UFormGroup>

                    <div class="pt-4">
                        <UButton type="submit" color="golden" size="xl" block label="Secure Login" :loading="loading"
                            class="rounded-full py-4 font-bold text-lg shadow-xl shadow-golden-500/10" />
                    </div>

                    <div v-if="errorMsg" class="text-center mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p class="text-xs text-red-500 font-medium">{{ errorMsg }}</p>
                    </div>
                </UForm>
            </UCard>

            <div class="mt-8 text-center">
                <UButton to="/" variant="ghost" color="gray" label="Back to Website" icon="i-heroicons-arrow-left"
                    size="sm" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
    layout: false,
    middleware: 'auth'
})

const auth = import.meta.client ? getAuth(useNuxtApp().$firebaseApp as import('firebase/app').FirebaseApp) : null
const loading = ref(false)
const errorMsg = ref('')
const router = useRouter()

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: '',
    password: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (!auth) return

    loading.value = true
    errorMsg.value = ''

    try {
        await signInWithEmailAndPassword(auth, state.email, state.password)
        router.replace('/admin')
    } catch (err: any) {
        errorMsg.value = 'Invalid credentials or unauthorized access.'
        console.error(err)
    } finally {
        loading.value = false
    }
}

useHead({
    title: 'Admin Login | Woolwich Temple',
    bodyAttrs: {
        class: 'bg-gray-950'
    }
})
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
