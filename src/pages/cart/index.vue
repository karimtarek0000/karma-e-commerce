<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Meta ------------
useSeoMeta({
  title: "Cart",
});

// ----------- Composables ------------
const { data: cart } = useNuxtData("cart");
const http = useHttp();
const toast = useToast();

// ----------------- Data -------------------
const productId = ref<string>();
const quantity = ref<number>(0);

// ----------------- API ------------------
// Update cart
const {
  pending: addToCartLoader,
  status: addToCartStatus,
  error: addToCartError,
  execute: addToCartExecute,
} = await useLazyAsyncData(
  () =>
    http("/cart", {
      method: "POST",
      body: {
        productId: productId.value,
        quantity: quantity.value,
      },
    }),
  { immediate: false }
);

// Delete product from cart
const {
  data: cartAfterDelete,
  pending: deleteProductCartLoader,
  status: deleteProductCartStatus,
  error: deleteProductCartError,
  execute: deleteProductCartExecute,
} = await useLazyAsyncData(
  "deleteCart",
  () =>
    http(`/cart/${productId.value}`, {
      method: "DELETE",
    }),
  { immediate: false }
);

// ----------------- Computed -------------------
const cartProducts = computed((): CartProduct[] => cart.value?.cart?.products);

// ----------------- Functions -------------------
const changeQuantityHandler = async (e: any, product: CartProduct): Promise<void> => {
  productId.value = product.productId._id;
  quantity.value = +e.target.value;
  product.quantity = quantity.value;

  if (quantity.value) {
    await addToCartExecute();

    if (!addToCartLoader.value && !addToCartError.value) {
      await refreshNuxtData("cart");
      toast.success(`Quantity updated successfully`);
    }
    if (addToCartError.value) {
      toast.error(addToCartError.value.message);
    }
  } else {
    toast.error("Must grather than 0");
  }
};
const deleteProductFromCartHandler = async (_productId: string): Promise<void> => {
  productId.value = _productId;

  await deleteProductCartExecute();

  if (!deleteProductCartLoader.value && !deleteProductCartError.value) {
    cart.value.cart = cartAfterDelete?.value?.cart as Cart;
    toast.success(`Quantity deleted successfully`);
  }
  if (deleteProductCartError.value) {
    toast.error(deleteProductCartError.value.message);
  }
};
const showLoader = (status: string, id: string) => {
  return status === "pending" && productId.value === id;
};
</script>

<template>
  <div class="wrapper">
    <!-- Total -->
    <h3 v-if="cartProducts?.length" class="px-2 text-white rounded-md text-22 bg-secondary w-fit">
      Total: <strong> {{ cart?.cart.subTotal || 0 }}</strong>
    </h3>

    <!-- Card -->
    <CartProduct
      v-if="cartProducts?.length"
      v-for="product in cartProducts"
      :key="product.productId?._id"
      v-bind="{
        product,
        addToCartStatus,
        deleteProductCartStatus,
        showLoader,
        changeQuantityHandler,
      }"
      @deleteProduct="deleteProductFromCartHandler"
    />

    <!-- If no any product -->
    <div v-if="!cartProducts?.length" class="max-w-[15.5rem] mx-auto py-4 text-center">
      <NuxtImg src="/cartempty.svg" class="res-image" fit="cover" />
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
</style>
