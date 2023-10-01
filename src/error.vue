<script setup lang="ts">
defineProps({ error: Object });

const clearErrorHandler = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h2 class="font-bold" style="font-size: 50px">{{ error?.statusCode }}</h2>
    <h3 class="text-22">{{ error?.message }}</h3>
    <button @click="clearErrorHandler" class="px-3 py-1 mt-3 text-white rounded-md bg-secondary">
      Go to home
    </button>
  </div>
</template>
