<script setup lang="ts">
const { iconName } = defineProps<{
  iconName: string;
}>();
</script>

<template>
  <svg class="w-[25px] h-[25px]">
    <use :xlink:href="`icons/sprite.svg#${iconName}`">
      <title>{{ iconName }}</title>
    </use>
  </svg>
</template>

<style lang="scss" scoped></style>
