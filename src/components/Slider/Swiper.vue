<script setup lang="ts">
// Options for Swiper slider
const options = {
  modules: [SwiperAutoplay, SwiperEffectCreative],
  slidesPerView: 1,
  loop: true,
  effect: "creative",
  autoplay: {
    delay: 8000,
    disableOnInteraction: true,
  },
  creativeEffect: {
    prev: {
      shadow: false,
      translate: ["-20%", 0, -1],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
};
</script>

<template>
  <Swiper class="relative" v-bind="options">
    <!-- Slides -->
    <slot />
    <!-- Controller -->
    <SliderController />
  </Swiper>
</template>
