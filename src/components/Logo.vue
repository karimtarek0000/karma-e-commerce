<script setup lang="ts"></script>

<template>
  <NuxtLink class="link" to="/">
    <nuxt-img src="/logo/logo.svg" class="max-w-full max-h-full" />
  </NuxtLink>
</template>

<style scoped>
.link {
  @apply w-[150px] lg:w-[200px] lg:h-[100px] h-[40px] flex items-center;
}
</style>
