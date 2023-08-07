<script setup lang="ts"></script>

<template>
  <NuxtLink class="cart" to="/">
    <span>10</span>
    <ShareRenderSVG iconName="cart" />
  </NuxtLink>
</template>

<style scoped>
.cart {
  @apply relative flex items-center;
}
.cart span {
  @apply flex justify-center items-center absolute -top-[16px] -end-[15px] rounded-full w-[25px] h-[25px] bg-primaryDarken text-white text-14;
}
</style>
