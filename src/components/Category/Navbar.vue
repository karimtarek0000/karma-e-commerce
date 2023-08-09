<script setup lang="ts">
const router = useRouter();
const categoryName = ref<string>("");
const items = reactive([
  {
    name: "electronics",
    path: "",
  },
  {
    name: "men",
    path: "",
  },
  {
    name: "women",
    path: "",
  },
  {
    name: "mobiles",
    path: "",
  },
  {
    name: "computers",
    path: "",
  },
]);

const overCategoryHandler = (item: any): void => {
  // TODO: send item name to the server
  categoryName.value = item.name;
};
const clickCategoryHandler = (item: any): void => {
  // TODO: Go to the page to view specific category
  // router.push('/')
};
</script>

<template>
  <nav class="nav-category">
    <div class="container relative">
      <div class="wrapper">
        <div class="links">
          <button
            v-for="item in items"
            :key="item.name"
            class="font-bold link"
            @mouseover="overCategoryHandler(item)"
            @click="clickCategoryHandler(item)"
          >
            {{ item.name }}
          </button>

          <!-- View the category after the user over on it -->
          <CategoryView :categoryName="categoryName" />
        </div>
        <NuxtLink class="capitalize text-14" to="/">All categories</NuxtLink>
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
</style>
