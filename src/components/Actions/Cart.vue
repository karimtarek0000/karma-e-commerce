<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Composables ------------
const http = useHttp();
const auth = useAuth();
const toast = useToast();

// ----------- Data ------------
const toggleCartQuickView = ref<boolean>(false);
const productId = ref<string>("");

// ----------- API ------------
// Get cart
const { data: cart } = await useAsyncData<{ cart: Cart }>("cart", () => http("/cart"), {
  pick: ["cart"],
});

// Delete product from cart
const {
  data: cartAfterDelete,
  pending: deleteLoader,
  error: deleteError,
  execute: deleteExcute,
  status,
} = await useAsyncData<{ cart: Cart }>(
  "deleteCart",
  () => http(`/cart/${productId.value}`, { method: "DELETE" }),
  {
    server: false,
    pick: ["cart"],
    immediate: false,
  }
);

// ----------- Computed ------------
const productsLength = computed((): number => cart.value?.cart?.products?.length as number);

// ----------- Functions ------------
const deleteProductFromCart = async (product: CartProduct): Promise<void> => {
  const { _id: id, title } = product.productId;
  productId.value = id;

  await deleteExcute();

  if (!deleteLoader.value && !deleteError.value) {
    cart.value.cart = cartAfterDelete?.value?.cart as Cart;
    toast.success(`Delete product ${title} successfully`);
  }
  if (deleteError.value) {
    toast.error(deleteError.value.message);
  }

  productId.value = "";
};
</script>

<template>
  <div class="cart">
    <!-- Toggle to open and close cart -->
    <button @click="toggleCartQuickView = !toggleCartQuickView">
      <ActionsCartCounter v-show="!!productsLength" :num="productsLength || 0" />
      <ShareRenderSVG iconName="cart" />
    </button>

    <!-- Show all products if exist -->
    <ActionsCartQuickView
      :total="(cart?.cart?.subTotal as number) || 0"
      :products="cart?.cart.products ?? []"
      :productId="productId"
      :statusLoader="status"
      v-show="toggleCartQuickView"
      @deleteProduct="deleteProductFromCart"
    />
  </div>
</template>

<style scoped>
.cart {
  @apply relative flex items-center;
}
</style>
