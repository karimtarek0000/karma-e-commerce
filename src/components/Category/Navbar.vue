<script setup lang="ts">
const http = useHttp();

// ----------------- From API ---------------------
const { data: categories } = await useAsyncData("categories", () =>
  http(CATEGORIES)
);
const allCategories = reactive<Gategory[]>(categories.value?.categories);
const setCategory = ref<Gategory>(allCategories[0]);

// ------------ Functions ------------
const overCategoryHandler = (category: Gategory): void => {
  setCategory.value = category;
};
</script>

<template>
  <nav class="py-3 bg-primary">
    <div class="container relative">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-4">
          <NuxtLink
            v-for="category in allCategories"
            :key="category.name"
            class="px-3 py-1 font-bold uppercase rounded-sm link text-18 hover:bg-secondary hover:text-white"
            :to="`/all-categories/${category?._id}`"
            @mouseover="overCategoryHandler(category)"
          >
            {{ category.name }}
          </NuxtLink>

          <!-- View the category after the user hover on it -->
          <CategoryView :category="setCategory" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.link:hover ~ .view,
.view:hover {
  @apply translate-y-0 opacity-100 pointer-events-auto;
}

/* Active link */
.router-link-exact-active {
  @apply text-white bg-secondary pointer-events-none;
}
</style>
