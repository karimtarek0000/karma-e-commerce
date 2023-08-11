<script setup lang="ts">
const { isDesktop } = useDevice();
const toggleCartQuickView = ref<boolean>(false);
</script>

<template>
  <div class="cart">
    <button @click="toggleCartQuickView = !toggleCartQuickView">
      <span>1</span>
      <ShareRenderSVG iconName="cart" />
    </button>
    <ActionsCartQuickView v-if="isDesktop" v-show="toggleCartQuickView" />
  </div>
</template>

<style scoped>
.cart {
  @apply relative flex items-center;
}
.cart span {
  @apply flex justify-center items-center absolute -top-[16px] -end-[15px] rounded-full w-[25px] h-[25px] bg-secondary text-white text-14;
}
</style>
