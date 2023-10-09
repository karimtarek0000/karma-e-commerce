<script setup lang="ts">
const { openModalHandler } = useModalController();

// ----------- Define ------------
const { options } = defineProps<{
  options: OptionsPropsOrder | any;
}>();
const emit = defineEmits(["closeQuickView"]);

// ----------- Functions ------------
const openOrderModal = () => {
  openModalHandler({
    $modalType: "order",
    $otherOptions: options,
  });

  if (options?.cartId) emit("closeQuickView");
};
</script>

<template>
  <button @click="openOrderModal" class="checkout-btn">Checkout</button>
</template>

<style scoped>
.checkout-btn {
  @apply w-full px-5 py-3 text-sm text-gray-100 transition bg-secondary rounded-md hover:bg-secondary/90;
}
</style>
