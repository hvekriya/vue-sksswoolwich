<template>
  <div
    class="follow-page min-h-screen relative overflow-x-hidden flex flex-col items-center py-16 px-6"
  >
    <!-- Immersive Background -->
    <div class="fixed inset-0 z-0">
      <img
        :src="defaultBgImage"
        class="w-full h-full object-cover blur-2xl scale-110 opacity-40 grayscale"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/60 to-gray-950"
      ></div>
    </div>

    <!-- Content Wrapper -->
    <div class="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
      <!-- Profile Section -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="relative inline-block mb-6">
          <div
            class="absolute inset-0 bg-golden-500 rounded-full blur-2xl opacity-20 animate-pulse"
          ></div>
          <img
            src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
            class="relative w-24 h-24 rounded-full border-4 border-white/10 shadow-2xl object-cover"
            alt="Woolwich Mandir"
          />
        </div>
        <h1 class="text-3xl font-serif font-bold text-white mb-1">Woolwich Temple</h1>
        <p class="text-golden-500 font-medium tracking-widest uppercase text-xs">
          Digital Spiritual Journey
        </p>
      </div>

      <!-- Links List -->
      <div v-if="linkTree?.length" class="w-full space-y-4">
        <div v-for="(item, index) in sortedLinkTree" :key="index" class="group">
          <template v-if="item.link">
            <a
              :href="item.link"
              target="_blank"
              class="flex items-center gap-4 p-5 glass-effect rounded-2xl border-white/5 hover:border-golden-500/40 transition-all duration-300 hover:scale-[1.02] shadow-xl"
            >
              <div
                class="p-3 bg-white/5 rounded-xl group-hover:bg-golden-500/10 transition-colors"
              >
                <UIcon
                  :name="getLinkIcon(item.icon)"
                  class="w-6 h-6 text-white group-hover:text-golden-900"
                />
              </div>
              <div class="flex-grow min-w-0">
                <h3 class="text-white font-bold">{{ item.title }}</h3>
                <div
                  v-if="item.description"
                  class="text-sm text-gray-400 prose prose-invert prose-sm max-w-none mt-1 link-description"
                  v-html="item.description"
                />
              </div>
              <UIcon
                name="i-heroicons-arrow-up-right"
                class="w-4 h-4 text-white/20 group-hover:text-golden-900"
              />
            </a>
          </template>

          <div v-else class="p-6 glass-effect rounded-2xl border-white/5 bg-white/5">
            <div class="flex items-center gap-4 mb-3">
              <UIcon :name="getLinkIcon(item.icon)" class="w-5 h-5 text-golden-500 shrink-0" />
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">
                {{ item.title }}
              </h3>
            </div>
            <div
              v-if="item.description"
              class="text-sm text-gray-300 leading-relaxed prose prose-invert prose-sm max-w-none info-card-content"
              v-html="item.description"
            />
          </div>
        </div>
      </div>

      <!-- Skeleton Loading -->
      <div v-else class="w-full space-y-4">
        <USkeleton v-for="i in 6" :key="i" class="h-20 w-full rounded-2xl opacity-10" />
      </div>

      <!-- Footer -->
      <footer class="mt-16 text-center">
        <p class="text-gray-500 text-xs font-medium tracking-widest uppercase">
          &copy; {{ new Date().getFullYear() }} Shree Swaminarayan Mandir Woolwich
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as dbRef, onValue } from "firebase/database";

definePageMeta({
  layout: "link-tree",
});

const db = useDatabase();
const linkTree = ref<any[]>([]);
const defaultBgImage =
  "https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format";

onMounted(() => {
  const treeRef = dbRef(db, "/link-tree");
  onValue(treeRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      linkTree.value = Object.keys(data).map((key) => ({
        ...data[key],
        key,
      }));
    }
  });
});

const sortedLinkTree = computed(() => {
  return [...linkTree.value].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
});

const getLinkIcon = (iconClass: string) => {
  if (!iconClass) return "i-heroicons-link";
  if (iconClass.startsWith("i-")) return iconClass;
  if (iconClass.includes("youtube")) return "i-simple-icons-youtube";
  if (iconClass.includes("facebook")) return "i-simple-icons-facebook";
  if (iconClass.includes("instagram")) return "i-simple-icons-instagram";
  if (iconClass.includes("twitter")) return "i-simple-icons-x";
  if (iconClass.includes("flickr")) return "i-simple-icons-flickr";
  if (iconClass.includes("envelope")) return "i-heroicons-envelope";
  if (iconClass.includes("phone")) return "i-heroicons-phone";
  return "i-heroicons-link";
};

useHead({
  title: "Follow Us | Woolwich Temple",
  bodyAttrs: {
    class: "bg-gray-950",
  },
});
</script>

<style scoped>
.follow-page {
  background-attachment: fixed;
}
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
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
.link-description :deep(p),
.info-card-content :deep(p) {
  margin: 0.25em 0;
}
.link-description :deep(a),
.info-card-content :deep(a) {
  @apply text-golden-400 underline hover:text-golden-300;
}
.link-description :deep(ul),
.info-card-content :deep(ul) {
  @apply list-disc pl-5 my-2;
}
.link-description :deep(ol),
.info-card-content :deep(ol) {
  @apply list-decimal pl-5 my-2;
}
</style>
