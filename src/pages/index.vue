<script setup lang="ts">
useSeoMeta({
  title: "Home",
});
</script>

<template>
  <!-- Slider products -->
  <SliderSwiper class="h-[400px]">
    <SwiperSlide v-for="slide in 5" :key="slide" class="bg-red-500">
      {{ slide }}
    </SwiperSlide>
  </SliderSwiper>
</template>

<style scoped></style>
