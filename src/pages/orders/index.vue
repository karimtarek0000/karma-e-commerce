<script setup lang="ts">
// ----------- Composables ------------
const http = useHttp();

// ----------- API ------------
const { data: orders, pending: loader } = await useLazyAsyncData<{ orders: Order[] }>(
  () => http("/order"),
  {
    pick: ["orders"],
    server: false,
  }
);
</script>

<template>
  <div class="wrapper">
    <!-- If no any order -->
    <div v-if="false" class="flex flex-col items-center">
      <div class="max-w-[15.5rem]">
        <NuxtImg src="/img/orders.svg" class="res-image" fit="cover" />
      </div>
      <h1 class="mt-2 font-bold text-center text-18">No any order yet!</h1>
      <NuxtLink to="/" class="px-3 py-2 mt-3 text-white rounded-md bg-secondary">
        Go to home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex items-center justify-center my-32;
}
</style>
