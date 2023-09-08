<script setup lang="ts">
const { isDesktop } = useDevice();
const toggleCartQuickView = ref<boolean>(false);
</script>

<template>
  <div class="cart">
    <button @click="toggleCartQuickView = !toggleCartQuickView">
      <ActionsCartCounter :num="1" />
      <ShareRenderSVG iconName="cart" />
    </button>
    <ActionsCartQuickView v-if="isDesktop" v-show="toggleCartQuickView" />
  </div>
</template>

<style scoped>
.cart {
  @apply relative flex items-center;
}
</style>
