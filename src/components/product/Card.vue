<script setup lang="ts">
// -------------------- Define ----------------------
defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="card">
    <!-- Rating -->
    <div class="absolute flex items-center top-2 start-2 gap-x-1">
      <ShareRenderSVG iconName="rating" sizes="w-[15px]" />
      <span class="text-14" v-text="product.reviewRatings" />
    </div>

    <!-- Image -->
    <div class="h-[12.5rem] flex justify-center">
      <NuxtImg
        :src="replaceCloudinaryURL(product.images[0].secure_url)"
        provider="cloudinary"
        preset="cloudinary"
        width="147"
        height="200"
        loading="lazy"
        class="res-image"
        fit="thumbnail"
        :alt="product.title"
      />
    </div>

    <!-- Informations -->
    <div class="info-wrapper">
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
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply border rounded-md overflow-hidden relative;
}
.info-wrapper {
  @apply px-2 py-1 capitalize;
}
</style>
