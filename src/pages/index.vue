<script setup lang="ts">
// ---------- Composables -----------
const http = useHttp();

// ---------- API -----------
const { data: sliderProducts } = useAsyncData(() => http("/home/slider"));

// ---------- Data -----------
const products = ref<SliderProducts[]>(sliderProducts.value?.sliderProducts);

// ---------- Meta -----------
useSeoMeta({
  title: "Home",
});
</script>

<template>
  <!-- Slider products -->
  <SliderSwiper>
    <SwiperSlide v-for="product in products" :key="product?.productId?._id">
      <SliderSlideProduct :product="product" />
    </SwiperSlide>
  </SliderSwiper>
</template>

<style scoped></style>
