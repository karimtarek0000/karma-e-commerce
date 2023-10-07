<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Define ------------
defineProps<{ product: CartProduct }>();

// ----------- Composables ------------
const { data: cart } = useNuxtData("cart");
const { modalControllerRef, openModalHandler } = useModalController();
const http = useHttp();
const toast = useToast();

// ----------------- Data -------------------
const productId = ref<string | null>();

// ----------------- API -----------------
const {
  data: cartAfterDelete,
  pending: deleteProductLoader,
  status: deleteProductCartStatus,
  error: deleteProductError,
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
const deleteProductFromCartHandler = async (_productId: string): Promise<void> => {
  productId.value = _productId;

  openModalHandler({
    $modalType: "confirm",
    $classes: "!items-start",
    $pickText: "deleteProduct",
  });
  const status = await modalControllerRef?.value?.confirmHandler();

  if (status) {
    await deleteProductCartExecute();

    if (!deleteProductLoader.value && !deleteProductError.value) {
      cart.value.cart = cartAfterDelete?.value?.cart as Cart;
      toast.success(`Quantity deleted successfully`);
    }
    if (deleteProductError.value) {
      toast.error(deleteProductError.value.message);
    }
  }

  productId.value = null;
};
</script>

<template>
  <button class="delete-product" @click="deleteProductFromCartHandler(product.productId?._id)">
    <ShareLoader
      v-if="showLoader(deleteProductCartStatus, productId!, product.productId._id)"
      class="delete-product__share-loader"
    />
    <ShareRenderSVG v-else iconName="del" v-bind="$attrs" />
  </button>
</template>

<style scoped>
.delete-product {
  @apply flex items-center gap-x-2;
}
.delete-product__share-loader {
  @apply !border-t-secondary !h-6;
}
</style>
