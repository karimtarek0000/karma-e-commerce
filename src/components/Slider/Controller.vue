<script setup lang="ts">
const swiper = useSwiper();
</script>

<template>
  <button class="btn btn-prev" @click="swiper.slidePrev()">
    <svg
      class="max-w-full max-h-full"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
    >
      <g>
        <path
          d="M15 19a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41L10.41 12l5.29 5.29A1 1 0 0 1 15 19z"
          data-name="17"
          fill="#FFFFFF"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  </button>
  <button class="btn btn-next" @click="swiper.slideNext()">
    <svg
      class="max-w-full max-h-full"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 6.35 6.35"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
    >
      <g>
        <path
          d="M2.258 1.315a.265.265 0 0 0-.174.469L3.703 3.17l-1.62 1.386a.265.265 0 1 0 .345.4L4.28 3.373a.265.265 0 0 0 0-.403L2.428 1.382a.265.265 0 0 0-.17-.067z"
          fill="#FFFFFF"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  </button>
</template>

<style scoped>
.btn {
  @apply hover:opacity-100 opacity-20 transition duration-200 ease-in-out z-10 absolute top-2/4 -translate-y-2/4 h-[1.875rem] w-[1.875rem]  lg:h-[3.125rem]  lg:w-[3.125rem];
}
.btn-prev {
  @apply start-0;
}
.btn-next {
  @apply end-0;
}
</style>
