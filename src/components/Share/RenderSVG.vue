<script setup lang="ts">
const { iconName, sizes } = defineProps<{
  iconName: string;
  sizes?: string;
}>();
</script>

<template>
  <svg :class="[`w-[1.5625rem] h-[1.5625rem] ${sizes}`]">
    <use :xlink:href="`icons/sprite.svg#${iconName}`">
      <title>{{ iconName }}</title>
    </use>
  </svg>
</template>
