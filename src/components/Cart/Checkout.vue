<script setup lang="ts">
const { openModalHandler } = useModalController();

// ----------- Define ------------
const props = defineProps<{
  options: OptionsPropsOrder | any;
}>();
const emit = defineEmits(["closeQuickView"]);

// ----------- Functions ------------
const openOrderModal = () => {
  openModalHandler({
    $modalType: "order",
    $otherOptions: props.options,
  });

  if (props.options?.cartId) emit("closeQuickView");
};
</script>

<template>
  <button @click="openOrderModal" class="checkout-btn">
    Checkout
    <ShareRenderSVG iconName="checkout" />
  </button>
</template>

<style scoped>
.checkout-btn {
  @apply flex justify-center items-center w-full gap-2 px-5 py-3 text-sm text-gray-100 transition bg-secondary rounded-md hover:bg-secondary/90;
}
</style>
