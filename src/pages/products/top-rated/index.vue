<script setup lang="ts">
// ---------- Composables -----------
const http = useHttp();

// TODO: check on backend if top rated pagination or not
// ---------- API -----------
const { data: products } = await useAsyncData<{ products: Product[] }>(
  "top-rated-products",
  () => http(TOP_RATINGS(1000)),
  {
    pick: ["products"],
  }
);
</script>

<template>
  <ProductTopRated v-if="products?.products" :products="products?.products" />
</template>
