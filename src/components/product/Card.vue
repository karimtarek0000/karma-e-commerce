<script setup lang="ts">
import { Product } from "types";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="card">
    <!-- Image -->
    <div class="h-[12.5rem] flex justify-center">
      <nuxt-img :src="product.images[0].secure_url" class="res-image" :alt="product.title" />
    </div>

    <div class="info-wrapper">
      <!-- Informations -->
      <div>
        <h5 class="font-bold truncate text-22">{{ product.title }}</h5>
        <p class="mt-2 truncate text-14">
          {{ product.description }}
        </p>
      </div>
      <!-- Price and discount -->
      <div class="flex items-center gap-2 mt-2 text-18">
        <h4 class="font-bold text-secondary">${{ product.priceAfterDiscount }}</h4>
        <h4 class="line-through" v-if="product.discount">${{ product.discount }}</h4>
      </div>
      <!-- Actions -->
      <button class="btn-add-cart">
        Add to cart
        <ShareRenderSVG iconName="to-cart" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply border rounded-md overflow-hidden;
}
.info-wrapper {
  @apply px-2 py-1 capitalize;
}
.btn-add-cart {
  @apply flex items-center justify-center gap-2 w-full p-2 mt-3 mb-1 hover:bg-opacity-95 text-white rounded-md bg-secondary;
}
</style>
