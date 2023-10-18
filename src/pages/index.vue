<script setup lang="ts">
// ---------- Composables -----------
const http = useHttp();

// ---------- API -----------
const { data: sliderProducts } = await useAsyncData<{ sliderProducts: SliderProducts[] }>(
  () => http("/home/slider"),
  {
    pick: ["sliderProducts"],
  }
);

// ---------- Meta -----------
useSeoMeta({
  title: "Home",
});
</script>

<template>
  <!-- Slider products -->
  <SliderSwiper>
    <SwiperSlide v-for="product in sliderProducts?.sliderProducts" :key="product?.productId?._id">
      <SliderSlideProduct :product="product" />
    </SwiperSlide>
  </SliderSwiper>
</template>

<style scoped></style>
