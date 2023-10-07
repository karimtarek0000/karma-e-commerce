<script setup lang="ts">
defineProps<{
  confirmStatusHandler: (status: boolean) => boolean;
}>();
</script>

<template>
  <h1>Confirm</h1>

  <div class="flex items-center">
    <button class="px-2 py-1 text-white bg-secondary" @click="confirmStatusHandler(true)">
      Confirm
    </button>
    <button @click="confirmStatusHandler(false)">cancel</button>
  </div>
</template>

<style lang="scss" scoped></style>
