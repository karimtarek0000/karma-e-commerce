<script setup lang="ts">
defineProps<{ product: CartProduct }>();
</script>

<template>
  <div class="card">
    <!-- Image -->
    <div class="h-[12.5rem] flex justify-center">
      <NuxtImg
        :src="replaceCloudinaryURL(product.productId?.images[0].secure_url)"
        provider="cloudinary"
        preset="cloudinary"
        class="res-image"
        loading="lazy"
        sizes="sm:50vw lg:80vw xl:100vw"
        fit="cover"
        :alt="product.productId?.title"
      />
    </div>

    <!-- Info -->
    <div class="space-y-2 max-md:text-center">
      <h3 class="text-2xl font-bold">{{ product.productId?.title }}</h3>
      <p>{{ product.productId?.description }}</p>

      <div class="space-x-2 text-18">
        <span>{{ product.productId.priceAfterDiscount }}</span>
        <span class="line-through" v-if="product.productId?.discount">{{
          product.productId?.discount
        }}</span>
      </div>

      <NuxtLink
        class="block mt-3 underline text-secondary"
        :to="`/products/product-details/${product.productId._id}`"
        >Go to product page</NuxtLink
      >
    </div>

    <!-- Actions -->
    <div
      class="flex flex-col items-center px-3 max-md:mb-2 lg:justify-self-end gap-y-5"
    >
      <!-- Input to add quantity -->
      <slot name="changeQuantity" />

      <!-- Delete product from cart -->
      <slot name="deleteProduct" />
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply grid grid-cols-1 md:grid-cols-[9.375rem_1fr_12.5rem] border rounded-md gap-4 items-center;
}
</style>
