<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="relative bg-gray-950 overflow-hidden py-24 lg:py-32">
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-golden-500/10 rounded-full blur-[160px]"
        ></div>
        <div
          class="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] bg-temple-red-500/10 rounded-full blur-[160px]"
        ></div>
      </div>

      <UContainer>
        <div class="relative z-10 text-center">
          <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white mb-8">
            Get in <span class="text-golden-500">Touch</span>
          </h1>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have a question about our festivals, want to plan a group visit,
            or need spiritual guidance, our doors and hearts are always open.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Content Section -->
    <section class="relative -mt-16 z-20 pb-24">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Contact Form Card -->
          <div class="lg:col-span-7">
            <UCard
              class="glass-effect rounded-[3rem] border-golden-500/10 overflow-hidden shadow-2xl"
            >
              <div class="p-8 lg:p-12">
                <h2
                  class="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2"
                >
                  Send a Message
                </h2>
                <div class="w-20 h-1 bg-golden-500 rounded-full mb-8"></div>

                <UForm
                  :schema="schema"
                  :state="state"
                  class="space-y-6"
                  @submit="onSubmit"
                >
                  <UFormGroup label="Full Name" name="name">
                    <UInput
                      v-model="state.name"
                      placeholder="John Doe"
                      size="xl"
                      variant="outline"
                      class="rounded-2xl"
                    />
                  </UFormGroup>

                  <UFormGroup label="Email Address" name="email">
                    <UInput
                      v-model="state.email"
                      type="email"
                      placeholder="john@example.com"
                      size="xl"
                    />
                  </UFormGroup>

                  <UFormGroup label="Message" name="message">
                    <UTextarea
                      v-model="state.message"
                      placeholder="How can we help you?"
                      :rows="6"
                    />
                  </UFormGroup>

                  <div class="pt-4">
                    <UButton
                      type="submit"
                      color="golden"
                      size="xl"
                      block
                      label="Send Message"
                      :loading="loading"
                      class="rounded-full py-4 font-bold text-lg shadow-xl shadow-golden-500/20"
                    />
                  </div>
                </UForm>
              </div>
            </UCard>
          </div>

          <!-- Contact Details -->
          <div class="lg:col-span-5 space-y-8">
            <!-- Location Card -->
            <div
              class="p-8 rounded-[2.5rem] bg-temple-red-600 text-white shadow-2xl relative overflow-hidden group"
            >
              <div class="relative z-10">
                <div
                  class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md"
                >
                  <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-2xl font-serif font-bold mb-4">Our Location</h3>
                <address class="not-italic text-white/90 leading-relaxed mb-6">
                  <strong class="text-white block mb-1">SKSS Temple Woolwich</strong>
                  St. Margarets Grove,<br />
                  London, SE18 7RL
                </address>
                <UButton
                  to="https://maps.app.goo.gl/YourTempleGoogleMapsLink"
                  target="_blank"
                  color="white"
                  variant="solid"
                  label="View on Google Maps"
                  icon="i-heroicons-arrow-top-right-on-square"
                  class="rounded-full shadow-lg font-bold text-temple-red-600"
                />
              </div>
              <UIcon
                name="i-heroicons-map"
                class="absolute -bottom-10 -right-10 w-48 h-48 text-white/10 group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <!-- Email Enquiries -->
            <div
              class="p-8 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-golden-500/10 shadow-xl space-y-8"
            >
              <div class="flex items-center gap-6">
                <div
                  class="w-12 h-12 bg-golden-50 dark:bg-golden-950 rounded-2xl flex items-center justify-center backdrop-blur-md"
                >
                  <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-golden-600" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">Admin Enquiries</h4>
                  <a
                    href="mailto:info@sksswoolwich.org"
                    class="text-golden-600 font-medium hover:underline"
                    >info@sksswoolwich.org</a
                  >
                </div>
              </div>

              <div class="flex items-center gap-6">
                <div
                  class="w-12 h-12 bg-temple-red-50 dark:bg-temple-red-950 rounded-2xl flex items-center justify-center backdrop-blur-md"
                >
                  <UIcon
                    name="i-heroicons-user-group"
                    class="w-6 h-6 text-temple-red-600"
                  />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">
                    Planning a Visit?
                  </h4>
                  <a
                    href="mailto:visits@sksswoolwich.org"
                    class="text-temple-red-600 font-medium hover:underline"
                    >visits@sksswoolwich.org</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const loading = ref(false);
const toast = useToast();

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  email: undefined,
  message: undefined,
});

const { submit: submitNetlify } = useNetlifyForm();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    const { ok, error } = await submitNetlify("contactus", {
      name: state.name,
      email: state.email,
      message: state.message,
    });
    if (!ok) throw new Error(error);
    toast.add({
      title: "Message Sent",
      description: "We have received your message and will get back to you shortly.",
      icon: "i-heroicons-paper-airplane",
      color: "primary",
    });
    Object.assign(state, { name: undefined, email: undefined, message: undefined });
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Connection error. Please try again later.",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
}

useHead({
  title: "Contact Us | Woolwich Temple",
  meta: [
    {
      name: "description",
      content:
        "Contact Shree Swaminarayan Mandir Woolwich for any enquiries or to plan your visit.",
    },
  ],
});
</script>
