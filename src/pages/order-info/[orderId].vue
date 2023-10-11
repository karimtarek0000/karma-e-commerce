<script setup lang="ts">
// ---------- Composables -----------
const { data: orderData } = useNuxtData("orderInfo");

// ---------- Data -----------
const order = ref<Order>(orderData.value?.order);

// ---------- Define -----------
definePageMeta({
  validate: async ({ params }) => {
    return /^[0-9A-z]{24}$/.test(params.orderId as string);
  },
});
</script>

<template>
  <div class="order-info">
    <div class="wrapper" v-if="order">
      <!-- Info -->
      <div class="px-3">
        <h2 class="title">order info</h2>

        <!-- Items -->
        <ul class="items">
          <li>
            <span>Products Count:</span>
            <span>{{ order.products?.length }}</span>
          </li>
          <li>
            <span>Payment Method:</span>
            <span>{{ order.paymentMethod }}</span>
          </li>
          <li>
            <span>Coupon Code:</span>
            <span>{{ order.couponId ? "Exist" : "Not exist" }}</span>
          </li>
          <li>
            <span>Sub Total:</span>
            <span>{{ order.subTotal.toLocaleString() }} EGP</span>
          </li>
          <li>
            <span>Paid Amount:</span>
            <span>{{ order.paidAmount.toLocaleString() }} EGP</span>
          </li>
          <li>
            <span>Order Status:</span>
            <span>{{ order.orderStatus }}</span>
          </li>
          <li>
            <span>Date:</span>
            <span>{{ formatDate(order.createdAt, "en-US") }}</span>
          </li>
        </ul>
      </div>
      <!-- QR code -->
      <div class="flex flex-col overflow-hidden p-7">
        <img
          :src="orderData?.orderQrCode"
          class="sm:max-w-[50%] lg:max-w-full mx-auto"
          alt="qrcode"
        />
        <p class="text-center text-14">Scan QRcode to get products details</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-info {
  @apply flex items-center justify-center my-5 lg:my-32;
}
.wrapper {
  @apply grid w-[80%] mx-auto items-center lg:max-w-[50%] grid-cols-1 lg:grid-cols-2 border rounded-md border-secondary;
}
.title {
  @apply py-1 mb-3 font-bold text-center capitalize border-b border-b-secondary text-18;
}
.items li {
  @apply flex items-center justify-between mb-1;
}
.items li span:nth-child(2) {
  @apply font-bold capitalize;
}
</style>
