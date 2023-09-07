<script setup lang="ts">
const debounce = useDebounce();
const { $http } = useNuxtApp();
import { Product } from "@/types";

// ---------------- Data -----------------
const search = ref<string>("");
const pageNumber = ref<number>(1);
const {
  data: products,
  error,
  pending: loader,
  execute,
} = useLazyAsyncData(() => $http(`/products?search=${search.value}&page=${pageNumber.value}&size=5`), { immediate: false });
const searchProductsList = ref<Product[]>([]);

// ---------------- Functions -----------------
const searchHandler = async () => {
  if (search.value) {
    await execute();
    if (!error.value) {
      searchProductsList.value = products.value.products;
    }
  }
};

const searchPaginationHandler = async (): Promise<void> => {
  pageNumber.value += 1;
  await execute();
  if (!error.value) {
    searchProductsList.value.push(...products.value.products);
  }
};

// ---------------- Watches -----------------
watch(search, (newValue) => {
  searchProductsList.value = [];
  if (newValue !== "") {
    loader.value = true;
  }
  debounce(searchHandler, 2000);
});
</script>

<template>
  <form class="relative me-auto">
    <!-- Search input -->
    <input v-model="search" class="input" type="text" placeholder="What are you looking for ?" />
    <div class="absolute top-2/4 -translate-y-2/4 end-3">
      <ShareRenderSVG iconName="search" sizes="w-[1.22rem]" />
    </div>

    <!-- Search list -->
    <div v-scroll="searchPaginationHandler" v-show="search" class="h-full search-list">
      <!-- Loader -->
      <div v-show="loader" class="flex items-center justify-center h-full">
        <ShareLoader class="!border-t-primary !w-7 !h-7" />
      </div>

      <!-- Data -->
      <NuxtLink
        v-for="product in searchProductsList"
        :key="product?._id"
        :to="`/product-details/${product?.slug}`"
        class="flex items-center px-1 py-2 gap-x-2"
      >
        <nuxt-img sizes="sm:50px lg:70px" width="70px" height="70px" :src="product?.images[0]?.secure_url" class="res-image" :alt="product?.title" />
        <h5 class="font-bold capitalize truncate text-14">{{ product?.title }}</h5>
      </NuxtLink>
    </div>
  </form>
</template>

<style scoped>
.input {
  @apply px-2 py-3 leading-[0] border-0 shrink min-w-[31.25rem] text-black bg-white rounded-md text-14;
}
.search-list {
  @apply scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-track-white absolute min-h-[12.5rem] max-h-[12.5rem] overflow-auto top-[100%] w-full shadow-md p-2 rounded-md mt-2 bg-white;
}
</style>
