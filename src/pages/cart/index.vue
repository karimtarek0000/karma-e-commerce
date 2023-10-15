<script setup lang="ts">
// ----------- Composables ------------
const { data: cart } = useNuxtData("cart");

// ----------------- Computed -------------------
const cartProducts = computed((): CartProduct[] => cart.value?.cart?.products);

// ----------- Meta ------------
useSeoMeta({
  title: "My cart",
});
</script>

<template>
  <div class="wrapper">
    <div v-if="cartProducts?.length" class="header">
      <!-- Total -->
      <h3 class="total">
        Total: <strong> {{ cart?.cart?.subTotal?.toLocaleString() || 0 }}</strong>
      </h3>

      <!-- Checkout -->
      <CartCheckout class="!w-fit" :options="{ cartId: cart?.cart._id }" />
    </div>

    <!-- Card -->
    <CartProduct
      v-if="cartProducts?.length"
      v-for="product in cartProducts"
      :key="product.productId?._id"
      :product="product"
    >
      <template #changeQuantity>
        <CartQuantity :product="product" />
      </template>
      <template #deleteProduct>
        <CartDeleteProduct :product="product" />
      </template>
    </CartProduct>

    <!-- If no any product -->
    <div
      v-if="!cartProducts?.length"
      class="max-w-[15.5rem] min-h-[16rem] mx-auto py-4 text-center"
    >
      <NuxtImg src="/img/cartempty.svg" class="res-image" fit="cover" />
      <h3 class="font-bold">Cart not exist any product yet!</h3>
      <NuxtLink
        to="/"
        class="block px-2 py-3 mt-4 text-white rounded-md hover:bg-secondary/95 bg-secondary"
        >Go to home page</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col mt-3 mb-10 gap-3 overflow-hidden;
}
.header {
  @apply flex gap-3 items-center justify-between max-md:flex-col;
}
.total {
  @apply px-2 text-white rounded-md text-22 bg-secondary w-fit;
}
</style>
