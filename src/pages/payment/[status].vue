<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Composables ------------
const http = useHttp();
const {
  params: { status },
  query: { token },
} = useRoute();
const toast = useToast();

// ----------- API ------------
const {
  data: order,
  pending: loader,
  error,
} = await useLazyAsyncData(
  "orderInfo",
  () =>
    http(PAYMENT_ORDER(status as string, token as string), {
      method: "PATCH",
    }),
  {
    server: false,
  }
);

// ----------- Life cycle hooks ------------
watch(loader, () => {
  if (!loader.value && !error.value) {
    order.value?.message.includes("canceled")
      ? toast.error(order.value?.message)
      : toast.success(order.value?.message);
  }

  if (error.value) {
    toast.error(order.value?.message);
  }

  navigateTo(ORDER_INFO(order.value?.order?._id));
});
</script>

<template>
  <div class="wrapper">
    <div class="max-w-[15.5rem]">
      <NuxtImg src="/img/payment.svg" class="res-image" fit="cover" />
    </div>
    <h1 class="title">
      payment process <span class="text-red-500">please wait...</span>
    </h1>

    <!-- Loder -->
    <ShareLoader v-if="loader" class="!border-t-secondary" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col items-center gap-3 my-10 lg:my-32;
}
.title {
  @apply mt-3 font-bold capitalize text-22 mb-3;
}
</style>
