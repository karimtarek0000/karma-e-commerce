<script setup lang="ts">
defineProps<{
  confirmStatusHandler: (status: boolean) => boolean;
}>();
</script>

<template>
  <h1>Confirm</h1>
  <button @click="confirmStatusHandler(true)">Confirm</button>
  <button @click="confirmStatusHandler(false)">cancel</button>
</template>

<style lang="scss" scoped></style>
