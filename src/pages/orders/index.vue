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

    <!-- Wrapper cards -->
    <div class="grid grid-cols-3 gap-3">
      <!-- Order Card -->
      <ul class="order-card" v-for="(order, i) in orders?.orders" :key="order._id">
        <li class="py-1 mb-2 font-bold text-center border-b border-b-secondary">
          Order: #{{ i + 1 }}
        </li>
        <li>
          <span>payment method:</span> <span class="font-bold">{{ order.paymentMethod }}</span>
        </li>
        <li>
          <span>paid amount:</span>
          <span class="font-bold">{{ order.paidAmount.toLocaleString() }}</span>
        </li>
        <li>
          <span>date:</span>
          <span class="font-bold">{{ formatDate(order.createdAt, "en-US") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex items-center justify-center my-20;
}
.order-card {
  @apply min-w-[400px] flex flex-col gap-1 px-2 py-1 capitalize border rounded-md border-secondary;
}
.order-card li:not(:first-of-type) {
  @apply flex justify-between;
}
</style>
