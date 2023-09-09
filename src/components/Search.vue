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
} = await useAsyncData(
  () =>
    $http("/products", {
      query: {
        search: search.value,
        page: pageNumber.value,
      },
    }),
  { immediate: false }
);
const searchProductsList = ref<Product[]>([]);

// ---------------- Functions -----------------
const searchHandler = async (): Promise<void> => {
  if (search.value) {
    await execute();
    if (!error.value) {
      searchProductsList.value = products.value.products;
    }
  }
};

const searchPaginationHandler = async (): Promise<void> => {
  if (searchProductsList.value.length && products.value.products.length) {
    pageNumber.value += 1;

    await execute();
    if (!error.value && !loader.value) {
      searchProductsList.value.push(...products.value.products);
    }
  }
};

const clearInput = (): string => (search.value = "");

// ---------------- Watches -----------------
watch(search, (newValue) => {
  pageNumber.value = 1;
  searchProductsList.value = [];
  if (newValue !== "") {
    loader.value = true;
  }
  debounce(searchHandler, 2000);
});
</script>

<template>
  <form class="relative max-lg:w-full me-auto">
    <!-- Search input -->
    <input v-model="search" class="input" type="text" placeholder="What are you looking for ?" />
    <div class="absolute top-2/4 -translate-y-2/4 end-3">
      <ShareRenderSVG v-show="!search" iconName="search" sizes="w-[1.22rem]" />
      <ShareLoader v-show="loader && search" class="!border-t-primary !w-7 !h-7" />
      <button @click="clearInput" v-show="search && !loader" type="button" class="text-2xl">&times;</button>
    </div>

    <!-- Search list -->
    <div v-show="search" class="search-list-wrapper">
      <!-- Data -->
      <div v-scroll="searchPaginationHandler" v-if="searchProductsList?.length" class="search-list">
        <NuxtLink
          v-for="product in searchProductsList"
          :key="product?._id"
          :to="`/product-details/${product?.slug}`"
          class="flex items-center px-1 py-2 gap-x-2"
        >
          <nuxt-img
            sizes="sm:50px lg:70px"
            width="70px"
            height="70px"
            :src="product?.images[0]?.secure_url"
            class="res-image"
            :alt="product?.title"
          />
          <h5 class="font-bold capitalize truncate text-14">{{ product?.title }}</h5>
        </NuxtLink>
      </div>
      <!-- Loader -->
      <h5 v-else class="flex items-center justify-center mt-8 font-bold text-center gap-x-3">
        No data exist <ShareRenderSVG iconName="search" sizes="w-[1.22rem]" />
      </h5>
    </div>
  </form>
</template>

<style scoped>
.input {
  @apply px-2 py-3 leading-[0] border-0 shrink max-lg:min-w-full min-w-[31.25rem] text-black bg-white rounded-md text-14;
}
.search-list-wrapper {
  @apply absolute z-50 block overflow-hidden top-[100%] w-full h-[170px] shadow-md rounded-md mt-2 bg-white;
}

.search-list {
  @apply scrollbar scrollbar-w-1 scrollbar-thumb-primary p-2 scrollbar-track-white overflow-auto h-[170px];
}
</style>
