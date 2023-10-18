<script setup lang="ts">
defineProps<{
  product: SliderProducts;
}>();
</script>

<template>
  <div class="h-[83vh] relative bg-gradient-to-r from-black">
    <!-- Image -->
    <NuxtImg
      :src="replaceCloudinaryURL(product.sliderImage.secure_url)"
      provider="cloudinary"
      preset="cloudinary"
      fit="cover"
      loading="lazy"
      :alt="product?.productId.title"
      class="relative w-full -z-[1] res-image"
    />

    <!-- Tag -->
    <span v-if="product.tag" class="tag"> best price </span>

    <!-- Info -->
    <div
      class="absolute flex flex-col items-start gap-6 text-white top-2/4 -translate-y-2/4 start-24"
    >
      <h3 class="text-5xl capitalize">{{ product?.productId.title }}</h3>
      <p class="max-w-md leading-8 text-18 text-white/70">
        {{ product?.productId.description }}
      </p>
      <span class="font-bold text-18">{{ product.productId.priceAfterDiscount }} EGP</span>

      <!-- Go to product details -->
      <NuxtLink class="btn" :to="`/product-details/${product.productId._id}`">Shop now</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.tag {
  @apply absolute px-3 py-1 capitalize text-white rounded-md bg-secondary top-5 start-5;
}
.btn {
  @apply px-6 text-18 py-3 mt-4 hover:bg-secondary hover:text-white transition duration-200 text-black bg-white rounded-md;
}
</style>
