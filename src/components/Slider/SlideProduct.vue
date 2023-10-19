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
    <div class="info">
      <h3 class="info__title">{{ product?.productId.title }}</h3>
      <p class="info__desc">
        {{ product?.productId.description }}
      </p>
      <span class="info__price">{{ product.productId.priceAfterDiscount }} EGP</span>

      <!-- Go to product details -->
      <NuxtLink class="go_to_prod_btn" :to="`/product-details/${product.productId._id}`"
        >Shop now</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/style/slider.css";

.info {
  @apply absolute flex flex-col items-center gap-6 px-6 text-white sm:items-start top-2/4 -translate-y-2/4 start-0 sm:start-24;
}
.info__title {
  @apply text-3xl capitalize sm:text-5xl;
}
.info__desc {
  @apply max-w-md leading-8 max-sm:text-center lg:text-18 text-white/70;
}
.info__price {
  @apply font-bold text-18;
}
.tag {
  @apply absolute px-3 py-1 capitalize text-white rounded-md bg-secondary top-5 start-5;
}
.go_to_prod_btn {
  @apply px-6 text-18 py-3 mt-4 hover:bg-secondary hover:text-white transition duration-200 text-black bg-white rounded-md;
}
</style>
