<script setup lang="ts">
const http = useHttp();

// ----------------- From API ---------------------
const { data: categories } = await useAsyncData("categories", () =>
  http(CATEGORIES)
);
const allCategories = reactive<Gategory[]>(categories.value?.categories);
</script>

<template>
  <nav class="flex items-center max-w-full overflow-auto bg-primary gap-x-4">
    <NuxtLink
      v-for="category in allCategories"
      :key="category?._id"
      :to="`/all-categories/${category?._id}`"
      class="px-2 py-2 uppercase"
      >{{ category?.name }}</NuxtLink
    >
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply bg-secondary text-white;
}
</style>
