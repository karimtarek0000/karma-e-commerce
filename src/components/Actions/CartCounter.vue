<script setup lang="ts">
defineProps<{
  num: number;
}>();
</script>

<template>
  <span>{{ num }}</span>
</template>

<style scoped>
span {
  @apply flex justify-center items-center absolute -top-[16px] -end-[15px] rounded-full w-[25px] h-[25px] bg-secondary text-white text-14;
}
</style>
