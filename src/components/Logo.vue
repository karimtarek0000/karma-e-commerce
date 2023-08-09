<script setup lang="ts"></script>

<template>
  <NuxtLink class="link" to="/">
    <nuxt-img src="/logo/logo.svg" class="max-w-full max-h-full" />
  </NuxtLink>
</template>

<style scoped>
.link {
  @apply lg:me-[1.875rem] w-[100px] h-[27.5px] lg:w-[200px] lg:h-[55px] flex items-center;
}
</style>
