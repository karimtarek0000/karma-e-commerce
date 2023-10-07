<script setup lang="ts">
const resetError = async (error: string) => {
  await navigateTo("/");
  error.value = null;
};
</script>

<template>
  <NuxtLayout>
    <NuxtErrorBoundary>
      <NuxtPage />

      <template #error="{ error }">
        <div class="flex flex-col items-center gap-3 mx-auto mt-5 w-fit">
          <h2 class="px-3 py-2 mx-auto text-white bg-red-500 rounded-md">
            Oh no, something went wrong <strong>{{ error.value.message }}</strong>
          </h2>
          <button class="px-3 py-1 text-white rounded-md bg-secondary" @click="resetError(error)">
            Reset error
          </button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>
