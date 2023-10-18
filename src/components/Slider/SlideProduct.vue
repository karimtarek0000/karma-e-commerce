<script setup lang="ts">
defineProps<{
  product: SliderProducts;
}>();
</script>

<template>
  <div class="h-[80vh] relative bg-gradient-to-r from-black">
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

    <!-- Info -->
    <div class="absolute text-white top-2/4 -translate-y-2/4 start-24">
      <h3 class="text-5xl capitalize mb-7">{{ product?.productId.title }}</h3>
      <p class="max-w-md leading-8 text-18 text-white/70">
        {{ product?.productId.description }}
      </p>
    </div>
  </div>
</template>
