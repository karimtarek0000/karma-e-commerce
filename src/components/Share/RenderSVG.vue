<script setup lang="ts">
const { iconName, sizes } = defineProps<{
  iconName: string;
  sizes?: string;
}>();
</script>

<template>
  <svg :class="[`w-[25px] h-[25px] ${sizes}`]">
    <use :xlink:href="`icons/sprite.svg#${iconName}`">
      <title>{{ iconName }}</title>
    </use>
  </svg>
</template>
