<script setup lang="ts">
defineProps({ error: Object });

const clearErrorHandler = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Add image Error -->
    <h1 class="text-3xl font-bold">{{ error?.statusCode }}</h1>
    <h2 class="text-18">{{ error?.message }}</h2>
    <button @click="clearErrorHandler" class="px-3 py-1 text-white rounded-md bg-secondary">
      Go to home
    </button>
  </div>
</template>
