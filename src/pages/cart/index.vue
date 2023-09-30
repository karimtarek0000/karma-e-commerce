<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Composables ------------
const http = useHttp();
const toast = useToast();

// ----------------- Data -------------------
const productId = ref<string>();
const quantity = ref<number>(0);

// ----------------- API ------------------
// Get Cart
const {
  data: cart,
  pending: cartLoader,
  error: cartError,
} = await useLazyAsyncData<{ cart: Cart }>("cart", () => http("/cart"), {
  server: false,
  pick: ["cart"],
});

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
const emptyStatus = computed(
  (): boolean => !cartLoader.value && !cartError.value && !cart.value?.cart?.products.length
);

// ----------------- Functions -------------------
const changeQuantityHandler = async (e: any, product: CartProduct): Promise<void> => {
  productId.value = product.productId._id;
  quantity.value = +e.target.value;
  product.quantity = quantity.value;

  if (quantity.value) {
    await addToCartExecute();

    if (!addToCartLoader.value && !addToCartError.value) {
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
    <!-- Card -->
    <CartProduct
      v-if="!cartLoader"
      v-for="product in cart?.cart?.products"
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

    <!-- Loader -->
    <LoadersCartProduct v-else />

    <!-- If no any product -->
    <div v-if="emptyStatus" class="max-w-[15.5rem] mx-auto py-4 text-center">
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
