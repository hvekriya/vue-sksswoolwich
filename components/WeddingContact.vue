<template>
  <div class="wedding-contact-section">
    <UCard class="glass-effect rounded-[3rem] border-white/10 overflow-hidden shadow-2xl">
      <div class="grid grid-cols-1 lg:grid-cols-12">
        <!-- Form Section -->
        <div class="lg:col-span-7 p-8 lg:p-12">
          <h2
            class="text-3xl font-serif font-bold text-gray-400 mb-8 border-l-4 border-golden-500 pl-4"
          >
            Enquiry Form
          </h2>
          <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
            <UFormGroup label="Full Name" name="name">
              <UInput
                v-model="state.name"
                placeholder="John Doe"
                size="xl"
                variant="outline"
                class="rounded-2xl"
              />
            </UFormGroup>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormGroup label="Email Address" name="email">
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="john@example.com"
                  size="xl"
                />
              </UFormGroup>
              <UFormGroup label="Phone Number" name="phone">
                <UInput
                  v-model="state.phone"
                  type="tel"
                  placeholder="07123 456789"
                  size="xl"
                />
              </UFormGroup>
            </div>

            <UFormGroup label="Event Date" name="eventDate">
              <UInput
                v-model="state.eventDate"
                placeholder="DD/MM/YYYY"
                size="xl"
                icon="i-heroicons-calendar"
              />
            </UFormGroup>

            <UFormGroup label="Message" name="message">
              <UTextarea
                v-model="state.message"
                placeholder="Please share any specific details or requirements for your event..."
                :rows="5"
              />
            </UFormGroup>

            <div class="pt-4">
              <UButton
                type="submit"
                color="golden"
                size="xl"
                block
                label="Send Request"
                :loading="loading"
                class="rounded-full py-4 font-bold text-lg shadow-xl shadow-golden-500/20"
              />
            </div>
          </UForm>
        </div>

        <!-- Info/Details Section -->
        <div
          class="lg:col-span-5 bg-temple-red-500 p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden group"
        >
          <div class="relative z-10 space-y-12">
            <div>
              <h3 class="text-2xl font-serif font-bold mb-6 italic">Our Location</h3>
              <address class="not-italic text-white/80 leading-relaxed font-light">
                <strong class="text-white block mb-1 font-bold"
                  >SKSS Temple Woolwich</strong
                >
                St. Margarets Grove,<br />
                London, SE18 7RL
              </address>
            </div>

            <div class="space-y-6">
              <div class="flex items-center gap-4 group/item">
                <div
                  class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover/item:scale-110 transition-transform"
                >
                  <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4
                    class="font-bold text-sm tracking-widest uppercase text-white/60 mb-1"
                  >
                    Events Team
                  </h4>
                  <a
                    href="mailto:bookings@sksswoolwich.org"
                    class="text-lg font-medium text-white hover:underline"
                    >bookings@sksswoolwich.org</a
                  >
                </div>
              </div>
            </div>

            <div class="pt-8">
              <p class="text-sm text-white/60 italic leading-relaxed">
                "Celebrate your sacred beginnings in a space filled with divinity and
                tradition."
              </p>
            </div>
          </div>

          <UIcon
            name="i-heroicons-hand-raised"
            class="absolute -bottom-20 -right-20 w-80 h-80 text-white/5 group-hover:rotate-12 transition-transform duration-1000"
          />
        </div>
      </div>
    </UCard>
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
  phone: z.string().min(10, "Invalid phone number"),
  eventDate: z.string().min(6, "Please provide a valid date"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  eventDate: undefined,
  message: undefined,
});

const { submit: submitNetlify } = useNetlifyForm();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    const { ok, error } = await submitNetlify("wedding-enquiry", {
      name: state.name,
      email: state.email,
      phone: state.phone,
      eventDate: state.eventDate,
      message: state.message,
    });
    if (!ok) throw new Error(error);
    toast.add({
      title: "Enquiry Received",
      description: "Our events team will contact you shortly to discuss your booking.",
      icon: "i-heroicons-check-circle",
      color: "primary",
    });
    Object.assign(state, {
      name: undefined,
      email: undefined,
      phone: undefined,
      eventDate: undefined,
      message: undefined,
    });
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Failed to send enquiry. Please try again.",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
}
</script>
