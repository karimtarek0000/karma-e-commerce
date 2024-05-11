<script setup lang="ts">
// ----------- Composables ------------
const http = useHttp();
const { openModalHandler } = useModalController();

// ----------- API ------------
const { data: orders, pending: loader } = await useLazyAsyncData<{
  orders: Order[];
}>(() => http(ORDER), {
  pick: ["orders"],
  server: false,
});

// ---------- Functions ------------
const openConfirmModal = (products: OrderProduct[], num: number): void => {
  openModalHandler({
    $modalType: "products",
    $otherOptions: { products, num },
  });
};

// ----------- Meta ------------
useSeoMeta({
  title: "My orders",
});
</script>

<template>
  <header
    v-if="orders?.orders.length"
    class="my-5 text-2xl font-bold text-center"
  >
    <h1>Orders</h1>
  </header>

  <!-- If no any order -->
  <ShareOrdersNotExist v-if="!loader && !orders?.orders.length" />

  <div class="wrapper">
    <!-- Wrapper cards -->
    <div class="wrapper-cards">
      <!-- Loader -->
      <LoadersCardProductOrder v-if="loader" v-for="i in 3" :key="i" />

      <!-- Order Card -->
      <ul
        v-else
        class="order-card"
        v-for="(order, i) in orders?.orders"
        :key="order._id"
      >
        <!-- Title -->
        <li class="py-1 mb-2 font-bold text-center border-b border-b-secondary">
          Order: #{{ i + 1 }}
        </li>
        <!-- Info -->
        <li>
          <span>payment method:</span>
          <span class="font-bold">{{ order.paymentMethod }}</span>
        </li>
        <li>
          <span>Coupon:</span>
          <span class="font-bold">{{
            order.couponId ? "Exist" : "Not Exist"
          }}</span>
        </li>
        <li>
          <span>sub total:</span>
          <span class="font-bold">{{ order.subTotal.toLocaleString() }}</span>
        </li>
        <li>
          <span>paid amount:</span>
          <span class="font-bold">{{ order.paidAmount.toLocaleString() }}</span>
        </li>
        <li>
          <span>Order Status:</span>
          <span class="font-bold">{{ order?.orderStatus }}</span>
        </li>
        <li>
          <span>date:</span>
          <span class="font-bold">{{
            formatDate(order.createdAt, "en-US")
          }}</span>
        </li>
        <!-- Click to view all products -->
        <li
          class="flex items-center py-2 mt-2 font-bold border-t border-t-secondary"
        >
          <span>products</span>
          <button
            @click="openConfirmModal(order.products, i + 1)"
            class="px-2 py-1 text-white rounded-sm text-14 bg-secondary"
          >
            view products
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex items-center justify-center lg:px-5;
}
.wrapper-cards {
  @apply grid w-full my-3 md:grid-cols-2 grid-cols-1 gap-3 lg:grid-cols-3 max-lg:px-2;
}
.order-card {
  @apply flex flex-col gap-1 px-2 py-1 capitalize border rounded-md border-secondary;
}
.order-card li:not(:first-of-type) {
  @apply flex justify-between;
}
</style>
