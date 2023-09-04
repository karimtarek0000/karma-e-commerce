<script setup lang="ts">
const { isDesktop } = useDevice();
</script>

<template>
  <CategoryNavbar v-if="isDesktop" />
</template>

<style scoped></style>
