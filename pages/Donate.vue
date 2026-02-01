<template>
  <div class="donate-page">
    <section class="relative bg-gray-900 overflow-hidden py-24 lg:py-32">
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
          <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white mb-8">
            Ways to <span class="text-golden-500">Donate</span>
          </h1>
          <p class="text-gray-900 text-lg font-light leading-relaxed">
            Your generous contributions help us maintain the Mandir, support our diverse
            community services, and preserve our spiritual heritage for future
            generations.
          </p>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-20">
      <UTabs :items="tabItems" class="w-full">
        <template #item="{ item }">
          <UCard
            class="glass-effect rounded-[3rem] border-golden-500/10 overflow-hidden shadow-2xl mt-8"
          >
            <div class="p-8 lg:p-12">
              <div v-if="item.key === 'bank-transfer'" class="space-y-8">
                <div class="flex items-center gap-4 mb-6">
                  <div class="p-4 bg-golden-50 rounded-2xl">
                    <UIcon
                      name="i-heroicons-building-library"
                      class="w-8 h-8 text-golden-600"
                    />
                  </div>
                  <h3 class="text-3xl font-serif font-bold text-white">Bank Transfer</h3>
                </div>

                <p class="text-gray-600">
                  BACS transfers are the most efficient way to donate. Please use the
                  details below:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    v-for="(detail, index) in bankDetails"
                    :key="index"
                    class="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-golden-200 transition-all"
                  >
                    <p
                      class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 group-hover:text-golden-600"
                    >
                      {{ detail.label }}
                    </p>
                    <div class="flex items-center justify-between">
                      <code class="text-lg font-mono text-gray-900">{{
                        detail.value
                      }}</code>
                      <UButton
                        icon="i-heroicons-clipboard-document"
                        variant="ghost"
                        color="gray"
                        @click="copyToClipboard(detail.value, detail.label)"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="bg-golden-50 p-6 rounded-2xl border border-golden-100 flex gap-4"
                >
                  <UIcon
                    name="i-heroicons-information-circle"
                    class="w-6 h-6 text-golden-600 shrink-0"
                  />
                  <p class="text-sm text-golden-800">
                    <strong>Payment Reference:</strong> Please use the format
                    <code>[Full Name] - [Donation Type]</code>
                    to help our accounting team.
                  </p>
                </div>
              </div>

              <div v-else-if="item.key === 'online'" class="text-center py-12">
                <div class="max-w-md mx-auto space-y-8">
                  <div class="inline-flex p-5 bg-blue-50 rounded-3xl mb-4">
                    <UIcon
                      name="i-simple-icons-stripe"
                      class="w-12 h-12 text-[#635BFF]"
                    />
                  </div>
                  <h3 class="text-3xl font-serif font-bold text-white">
                    Secure Online Donation
                  </h3>
                  <p class="text-gray-500">
                    Fast and secure donations via Stripe. Supports all major cards and
                    digital wallets.
                  </p>

                  <div class="pt-6">
                    <UButton
                      to="https://donate.stripe.com/example"
                      target="_blank"
                      color="golden"
                      size="xl"
                      block
                      class="rounded-full py-5 font-bold text-xl shadow-xl shadow-golden-500/20"
                    >
                      Donate Now Online
                    </UButton>
                    <p class="text-xs text-gray-900 mt-6 italic">
                      Secure payment processed by Stripe. Your data is protected.
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="item.key === 'standing-order'" class="space-y-8">
                <div class="flex items-center gap-4 mb-6">
                  <div class="p-4 bg-temple-red-50 dark:bg-temple-red-950/30 rounded-2xl">
                    <UIcon
                      name="i-heroicons-arrow-path"
                      class="w-8 h-8 text-temple-red-600"
                    />
                  </div>
                  <h3 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                    Standing Order
                  </h3>
                </div>

                <p class="text-gray-600">
                  Provide sustainable support by setting up a recurring monthly donation.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div
                    class="p-8 border border-gray-100 rounded-[2rem] hover:shadow-lg transition-all bg-white relative group"
                  >
                    <h4 class="font-bold text-xl mb-4">Via Paper Form</h4>
                    <p class="text-sm text-gray-500 mb-6">
                      Download, sign, and return the form to the Mandir or your bank
                      branch.
                    </p>
                    <UButton
                      block
                      color="temple-red"
                      variant="soft"
                      label="Temple Red (Primary Support)"
                      icon="i-heroicons-arrow-down-tray"
                      class="mb-4 px-4 rounded-full font-bold"
                    />
                  </div>

                  <div
                    class="p-8 border border-gray-100 rounded-[2rem] hover:shadow-lg transition-all bg-white"
                  >
                    <h4 class="font-bold text-xl mb-4">Via Online Banking</h4>
                    <p class="text-sm text-gray-500 mb-6">
                      Use your bank's app to set up a monthly transfer to the Mandir
                      account.
                    </p>
                    <div class="space-y-3">
                      <div
                        class="flex justify-between text-sm py-2 border-b border-gray-50"
                      >
                        <span class="text-gray-900 font-medium">Account</span>
                        <span class="font-mono font-bold">80813745</span>
                      </div>
                      <div class="flex justify-between text-sm py-2">
                        <span class="text-gray-900 font-medium">Sort Code</span>
                        <span class="font-mono font-bold">20-98-57</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="item.key === 'gift-aid'" class="space-y-8">
                <div
                  class="bg-gray-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden"
                >
                  <div class="relative z-10 max-w-xl">
                    <UBadge
                      label="UK Tax Payers"
                      color="golden"
                      variant="soft"
                      class="mb-4"
                    />
                    <h3 class="text-4xl font-serif font-bold mb-6 italic">
                      Boost your donation by <span class="text-golden-500">25%</span> at
                      no extra cost.
                    </h3>
                    <p class="text-gray-900 mb-8 leading-relaxed">
                      If you are a UK taxpayer, Gift Aid allows the Temple to reclaim an
                      extra 25p for every £1 you donate.
                    </p>
                    <UButton
                      to="/gift-aid-form"
                      color="golden"
                      size="xl"
                      label="Complete Gift Aid Form"
                      class="rounded-full px-10 font-bold"
                    />
                  </div>
                  <UIcon
                    name="i-heroicons-heart"
                    class="absolute -bottom-20 -right-20 w-80 h-80 text-white/5"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

const tabItems = [
  { key: "bank-transfer", label: "Bank Transfer" },
  { key: "online", label: "Online Stripe" },
  { key: "standing-order", label: "Standing Order" },
  { key: "gift-aid", label: "Gift Aid" },
];

const bankDetails = [
  { label: "Bank Name", value: "Barclays Bank Plc" },
  { label: "Sort Code", value: "20-98-57" },
  { label: "Account Number", value: "80813745" },
  { label: "Account Name", value: "S K S Swaminarayan Temple" },
  { label: "SWIFT Code", value: "BARCGB22" },
  { label: "IBAN Number", value: "GB23 BARC 2098 5780 8137 45" },
];

const copyToClipboard = (text: string, label: string) => {
  if (text) {
    // Safety check for text
    navigator.clipboard.writeText(text);
    toast.add({
      title: "Copied to Clipboard",
      description: `${label} has been copied successfully.`,
      icon: "i-heroicons-check-circle",
      color: "primary",
    });
  } else {
    toast.add({
      title: "Copy Failed",
      description: `No value to copy for ${label}.`,
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  }
};

useHead({
  title: "Ways to Donate | Woolwich Temple",
  meta: [
    {
      name: "description",
      content:
        "Support Shree Swaminarayan Mandir Woolwich through bank transfers, online donations, or Gift Aid.",
    },
  ],
});
</script>
