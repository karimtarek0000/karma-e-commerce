<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Define ------------
defineProps<{ product: CartProduct }>();

// ----------- Composables ------------
const http = useHttp();
const toast = useToast();

// ----------------- Data -------------------
const productId = ref<string | null>();
const quantity = ref<number>(0);

// ------------------ API -------------------
const {
  pending: addToCartLoader,
  status: addToCartStatus,
  error: addToCartError,
  execute: addToCartExecute,
} = await useAsyncData(
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

    productId.value = null;
  } else {
    toast.error("Must grather than 0");
  }
};
</script>

<template>
  <!-- Input to add quantity -->
  <div class="quantitt__wrapper">
    <ShareLoader
      v-if="showLoader(addToCartStatus, productId!, product.productId._id)"
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
</template>

<style scoped>
.quantitt__wrapper {
  @apply max-w-[100px] min-w-[100px] min-h-[45px] flex items-center justify-center;
}
</style>
