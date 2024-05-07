<script setup lang="ts">
const http = useHttp();

// ----------------- From API ---------------------
const { data: categories } = await useAsyncData(() => http(CATEGORIES));
const allCategories = reactive<Gategory[]>(categories.value?.categories);
const setCategory = ref<Gategory>(allCategories[0]);

// ------------ Functions ------------
const overCategoryHandler = (category: Gategory): void => {
  setCategory.value = category;
};
</script>

<template>
  <nav class="nav-category">
    <div class="container relative">
      <div class="wrapper">
        <div class="links">
          <NuxtLink
            v-for="category in allCategories"
            :key="category.name"
            class="font-bold link"
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
.nav-category {
  @apply py-3 bg-primary;
}
.nav-category .wrapper {
  @apply flex items-center justify-between;
}
.nav-category .links {
  @apply flex items-center gap-x-4;
}
.link {
  @apply uppercase text-18 rounded-sm px-3 py-1 hover:bg-secondary hover:text-white;
}

.link:hover ~ .view,
.view:hover {
  @apply translate-y-0 opacity-100 pointer-events-auto;
}

/* Active link */
.router-link-exact-active {
  @apply text-white bg-secondary;
}
</style>
