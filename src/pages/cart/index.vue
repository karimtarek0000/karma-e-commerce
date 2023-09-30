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
const { data: cart } = await useLazyAsyncData<{ cart: Cart }>("cart", () => http("/cart"), {
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

// ----------------- Functions -------------------
const changeQuantityHandler = async (e: any, product: CartProduct): Promise<void> => {
  productId.value = product.productId._id;
  quantity.value = +e.target.value;
  product.quantity = quantity.value;

  await addToCartExecute();

  if (!addToCartLoader.value && !addToCartError.value) {
    toast.success(`Quantity updated successfully`);
  }
  if (addToCartError.value) {
    toast.error(addToCartError.value.message);
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
    <div class="card" v-for="product in cart?.cart?.products" :key="product.productId?._id">
      <!-- Image -->
      <div class="h-[12.5rem] flex justify-center">
        <NuxtImg
          :src="replaceCloudinaryURL(product.productId?.images[0].secure_url)"
          provider="cloudinary"
          preset="cloudinary"
          class="res-image"
          loading="lazy"
          sizes="sm:50vw lg:80vw xl:100vw"
          fit="cover"
          :alt="product.productId?.title"
        />
      </div>

      <!-- Info -->
      <div class="space-y-2 max-md:text-center">
        <h3 class="text-2xl font-bold">{{ product.productId?.title }}</h3>
        <p>{{ product.productId?.description }}</p>

        <div class="space-x-2 text-18">
          <span>{{ product.productId.priceAfterDiscount }}</span>
          <span class="line-through" v-if="product.productId?.discount">{{
            product.productId?.discount
          }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col items-center px-3 max-md:mb-2 lg:justify-self-end gap-y-5">
        <!-- Input to add quantity -->
        <div class="max-w-[100px] min-w-[100px] min-h-[45px] flex items-center justify-center">
          <ShareLoader
            v-if="showLoader(addToCartStatus, product.productId._id)"
            class="!border-t-secondary"
          />
          <input
            v-else
            class="w-full rounded-md"
            type="number"
            :value="product?.quantity"
            min="0"
            @change="changeQuantityHandler($event, product)"
          />
        </div>

        <!-- Delete product from cart -->
        <button
          class="flex items-center gap-x-2"
          @click="deleteProductFromCartHandler(product.productId?._id)"
        >
          <ShareLoader
            v-if="showLoader(deleteProductCartStatus, product.productId._id)"
            class="!border-t-secondary !h-6"
          />
          <ShareRenderSVG v-else iconName="del" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col mt-3 mb-10 gap-3 overflow-hidden;
}
.card {
  @apply grid grid-cols-1 md:grid-cols-[9.375rem_1fr_12.5rem] border rounded-md gap-4 items-center;
}
</style>
