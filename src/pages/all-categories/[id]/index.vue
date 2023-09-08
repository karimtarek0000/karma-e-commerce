<script setup lang="ts">
import { Gategory } from "types";
const { $http } = useNuxtApp();
const {
  params: { id },
} = useRoute();

// const { data: categories } = await useLazyAsyncData(() => $http("/categories"));
</script>

<template>
  <!-- Desktop -->
  <div class="desktop-wrapper">
    <!-- Aside all actions -->
    <aside class="py-4 bg-black/5">
      <!-- Name of category -->
      <h4 class="name-category">mobiles</h4>
    </aside>

    <!-- All products and pagination -->
    <div class="bg-black/5">products</div>
  </div>
  <h1>Specific Category</h1>
</template>

<style scoped>
.desktop-wrapper {
  @apply grid grid-cols-[18.75rem_1fr] gap-x-5 min-h-screen;
}
.name-category {
  @apply font-bold text-center py-2 capitalize border-b-[1px] text-secondary text-22 border-b-secondary;
}
</style>
