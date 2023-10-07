<script setup lang="ts">
defineProps<{
  confirmStatusHandler: (status: boolean) => boolean;
}>();
</script>

<template>
  <div class="text-center">
    <h1 class="mb-2 font-bold text-22">Delete product</h1>
    <p class="text-18">Are you sure want delete a product from cart</p>
  </div>
  <div class="flex items-center justify-center gap-2 mt-5">
    <button
      class="px-4 py-2 border rounded-md border-secondary"
      @click="confirmStatusHandler(false)"
    >
      cancel
    </button>
    <button
      class="px-4 py-2 text-white rounded-md hover:bg-secondary/90 bg-secondary"
      @click="confirmStatusHandler(true)"
    >
      Confirm
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
