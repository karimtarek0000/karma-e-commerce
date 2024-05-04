<script setup lang="ts">
defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div class="cards-grid">
    <template v-for="product in products" :key="product._id">
      <NuxtLink :to="`/products/product-details/${product._id}`">
        <ProductCard :product="product">
          <CartAddTo :product="product" />
        </ProductCard>
      </NuxtLink>
    </template>
  </div>
</template>

<style scoped>
.cards-grid {
  @apply px-5 max-xl:px-2 grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4;
}
</style>
