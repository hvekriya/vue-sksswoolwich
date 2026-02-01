<template>
  <div class="online-donations py-8">
    <UCard class="glass-effect rounded-[2.5rem] border-golden-500/10 shadow-xl overflow-hidden">
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="p-8 md:w-2/3">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-golden-500/10 rounded-2xl flex items-center justify-center">
              <UIcon name="i-heroicons-banknotes" class="w-6 h-6 text-golden-600" />
            </div>
            <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">Secure Online Donation</h3>
          </div>

          <div class="space-y-4 text-gray-600 dark:text-gray-900 leading-relaxed mb-8">
            <p>Make a secure online donation at any time, either as a one-off gift or a regular monthly contribution.
            </p>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="text-golden-500" /> Specify donation type (e.g., Patotsav,
                Diwali) in PayPal notes.
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="text-golden-500" /> Remember to tick the Gift Aid box if
                you are a UK taxpayer.
              </li>
            </ul>
          </div>

          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="TN9K7L42E2GRE" />
            <UButton type="submit" size="xl" color="primary"
              class="rounded-full px-10 font-bold py-4 shadow-lg shadow-golden-500/20">
              Donate with
              <img src="https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom-white.svg" alt="PayPal"
                class="h-6 ml-2" />
            </UButton>
          </form>
        </div>

        <div class="hidden md:block w-1/3 h-full bg-golden-500/5 p-8 self-stretch flex items-center justify-center">
          <UIcon name="i-heroicons-heart" class="w-32 h-32 text-golden-500/20" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// No complex logic needed for the simple PayPal redirect form
</script>