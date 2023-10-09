<script setup lang="ts">
defineProps({ error: Object });

const clearErrorHandler = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- This image will show if status code equal `404` -->
    <div class="max-w-[15.5rem]">
      <NuxtImg v-if="error?.statusCode === 404" src="/img/404.svg" class="res-image" fit="cover" />
    </div>
    <h2 class="font-bold" style="font-size: 50px">{{ error?.statusCode }}</h2>
    <h3 class="text-22">{{ error?.message }}</h3>
    <button @click="clearErrorHandler" class="px-3 py-2 mt-3 text-white rounded-md bg-secondary">
      Go to home
    </button>
  </div>
</template>
