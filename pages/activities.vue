<template>
  <div class="activities-page">
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
        <div class="relative z-10 text-center max-w-3xl mx-auto">
          <UBadge
            color="golden"
            variant="soft"
            label="Community Classes"
            class="mb-6 rounded-full px-6"
          />
          <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white mb-8">
            Sign up for <span class="text-golden-500">Weekly Activities</span>
          </h1>
          <p class="text-gray-400 text-lg leading-relaxed font-light">
            Enhance your spiritual and cultural journey by joining our diverse range of
            classes and community programs.
          </p>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Info Panel -->
        <div class="lg:col-span-5 space-y-8">
          <div
            v-for="(info, index) in activityInfo"
            :key="index"
            class="flex gap-6 p-8 glass-effect rounded-[2rem] border-golden-500/10 hover:border-golden-500/30 transition-all group"
          >
            <div
              class="p-4 bg-golden-50 dark:bg-golden-950/30 rounded-2xl h-fit group-hover:scale-110 transition-transform"
            >
              <UIcon :name="info.icon" class="w-8 h-8 text-golden-600" />
            </div>
            <div>
              <h3
                class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1"
              >
                {{ info.title }}
              </h3>
              <p class="text-sm text-golden-600 font-bold uppercase tracking-wider mb-3">
                {{ info.time }}
              </p>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {{ info.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Form Panel -->
        <div class="lg:col-span-7">
          <UCard
            class="glass-effect rounded-[3rem] border-golden-500/10 shadow-2xl overflow-hidden p-0"
          >
            <div class="bg-gray-900 p-8 lg:p-12 text-white relative overflow-hidden">
              <div class="relative z-10">
                <h2 class="text-3xl font-serif font-bold mb-2">
                  Registration your interest
                </h2>
                <div class="w-16 h-1 bg-golden-500 rounded-full"></div>
                <p class="text-gray-400 text-sm mt-6">
                  Please fill in your details to register your interest in our classes.
                </p>
              </div>
              <UIcon
                name="i-heroicons-pencil-square"
                class="absolute -bottom-10 -right-10 w-48 h-48 text-white/5"
              />
            </div>

            <UForm
              :schema="schema"
              :state="state"
              class="p-8 space-y-8"
              @submit="onSubmit"
            >
              <UFormGroup label="Full Name" name="name" required>
                <UInput
                  v-model="state.name"
                  placeholder="John Doe"
                  icon="i-heroicons-user"
                  size="lg"
                  class="rounded-2xl"
                />
              </UFormGroup>

              <UFormGroup label="Select Activities" name="activities" required>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UCheckbox
                    v-for="activity in activities"
                    :key="activity.value"
                    v-model="state.selectedActivities"
                    :value="activity.value"
                    :label="activity.label"
                    :ui="{ rounded: 'rounded-md' }"
                  />
                </div>
              </UFormGroup>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UFormGroup label="Email Address" name="email" required>
                  <UInput
                    v-model="state.email"
                    type="email"
                    placeholder="john@example.com"
                    icon="i-heroicons-envelope"
                    size="lg"
                  />
                </UFormGroup>
                <UFormGroup label="Phone Number" name="phone" required>
                  <UInput
                    v-model="state.phone"
                    type="tel"
                    placeholder="07123 456789"
                    icon="i-heroicons-phone"
                    size="lg"
                  />
                </UFormGroup>
              </div>

              <UFormGroup label="Additional Information" name="message">
                <UTextarea
                  v-model="state.message"
                  placeholder="Any dietary requirements or special notes..."
                  :rows="4"
                />
              </UFormGroup>

              <div class="pt-4">
                <UButton
                  type="submit"
                  size="xl"
                  color="golden"
                  block
                  class="rounded-full font-bold py-5 text-lg shadow-xl shadow-golden-500/20"
                  :loading="loading"
                >
                  Submit Registration
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const loading = ref(false);
const toast = useToast();

const activityInfo = [
  {
    title: "Bharatanatyam",
    time: "Mondays @ 5:00 PM",
    icon: "i-heroicons-sparkles",
    description:
      "Classical Indian dance form that expresses spiritual themes and folklore.",
  },
  {
    title: "Bhajan Class",
    time: "Mondays @ 7:00 PM",
    icon: "i-heroicons-musical-note",
    description: "Devotional singing and music to deepen your spiritual connection.",
  },
  {
    title: "Satsang Together Yuvak Mandal Sabha (16+)",
    time: "Mondays @ 7:00 PM",
    icon: "i-heroicons-user-group",
    description: "Youth-focused spiritual gathering for ages 16 and above.",
  },
  {
    title: "Tabla Class",
    time: "Tuesdays @ 7:00 PM",
    icon: "i-heroicons-musical-note",
    description:
      "Learn the intricate rhythms of Indian percussion under professional guidance.",
  },
  {
    title: "Academic Support",
    time: "Saturdays @ 9:00 AM",
    icon: "i-heroicons-academic-cap",
    description: "Supplementary classes in Maths, English, and Gujarati for all ages.",
  },
  {
    title: "Satsang Classes",
    time: "Saturdays @ 6:00 PM",
    icon: "i-heroicons-book-open",
    description:
      "Religious classes for ages 6–16 to learn about Hinduism, Swaminarayan, and how to be a good human.",
  },
];

const activities = [
  { label: "Bharatanatyam Class", value: "bharatanatyam" },
  { label: "Bhajan Class", value: "bhajan" },
  { label: "Satsang Together Yuvak Mandal Sabha (16+)", value: "satsang_together" },
  { label: "Tabla Class", value: "tabla" },
  { label: "Satsang Classes (Age 6–16)", value: "satsang_classes" },
  { label: "Academic Classes", value: "academic" },
];

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  selectedActivities: z.array(z.string()).min(1, "Please select at least one activity"),
  message: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  selectedActivities: [],
  message: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    // In a real netlify environment, we would post to index.html with form-name
    // For now, we simulate success
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.add({
      title: "Success!",
      description: "Your registration has been submitted. We will contact you soon.",
      icon: "i-heroicons-check-circle",
      color: "primary",
    });
    // Reset form
    Object.assign(state, {
      name: undefined,
      email: undefined,
      phone: undefined,
      selectedActivities: [],
      message: undefined,
    });
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Failed to submit form. Please try again.",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
}

useHead({
  title: "Sign Up for Activities | Woolwich Temple",
  meta: [
    {
      name: "description",
      content: "Register for our weekly classes including dance, music, and academics.",
    },
  ],
});
</script>
