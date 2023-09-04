<script setup lang="ts">
const { params } = useRoute();
</script>

<template>
  <h1>Slug:{{ params.slug }}</h1>
</template>

<style lang="scss" scoped></style>
