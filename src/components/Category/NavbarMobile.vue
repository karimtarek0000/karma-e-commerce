<script setup lang="ts">
import { Gategory } from "types";
const { $http } = useNuxtApp();

// ----------------- From API ---------------------
const { data: categories } = await useLazyAsyncData(() => $http("/categories"));
const allCategories = reactive<Gategory[]>(categories.value?.categories);
</script>

<template>
  <nav class="navbar">
    <NuxtLink
      v-for="category in allCategories"
      :key="category?.name"
      :to="`/all-categories/${category?.slug}`"
      class="px-2 py-2 uppercase"
      type="button"
      >{{ category?.name }}</NuxtLink
    >
  </nav>
</template>

<style scoped>
.navbar {
  @apply flex items-center max-w-full overflow-auto bg-primary gap-x-4;
}
.router-link-active {
  @apply bg-secondary text-white;
}
</style>
