<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Composables ------------
const http = useHttp();
const toast = useToast();

// ----------- Data ------------
const toggleCartQuickView = ref<boolean>(false);
const productId = ref<string>("");

// ----------- API ------------
// Get cart
const { data: cart } = await useAsyncData<{ cart: Cart }>(
  "cart",
  () => http(CART),
  {
    pick: ["cart"],
  }
);

// Delete product from cart
const {
  data: cartAfterDelete,
  pending: deleteLoader,
  error: deleteError,
  execute: deleteExcute,
  status,
} = await useAsyncData<{ cart: Cart }>(
  "deleteCart",
  () => http(DELETE_PRODUCT_FROM_CART(productId.value), { method: "DELETE" }),
  {
    server: false,
    pick: ["cart"],
    immediate: false,
  }
);

// ----------- Computed ------------
const productsLength = computed(
  (): number => cart.value?.cart?.products?.length as number
);

// ----------- Functions ------------
const deleteProductFromCart = async (product: CartProduct): Promise<void> => {
  const { _id: id, title } = product.productId;
  productId.value = id;

  await deleteExcute();

  if (!deleteLoader.value && !deleteError.value) {
    if (cart.value) {
      cart.value.cart = cartAfterDelete?.value?.cart as Cart;
    }
    toast.success(`Delete product ${title} successfully`);
  }
  if (deleteError.value) {
    toast.error(deleteError.value.message);
  }

  productId.value = "";
};
const toggleQuickViewHandler = () => {
  toggleCartQuickView.value = !toggleCartQuickView.value;
};
</script>

<template>
  <div class="cart">
    <!-- Toggle to open and close cart -->
    <button class="max-lg:hidden" @click="toggleQuickViewHandler">
      <ActionsCartCounter
        v-show="!!productsLength"
        :num="productsLength || 0"
      />
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
    >
      <template #checkout>
        <CartCheckout
          :options="{ cartId: cart?.cart._id }"
          @closeQuickView="toggleQuickViewHandler"
        />
      </template>
    </ActionsCartQuickView>
  </div>
</template>

<style scoped>
.cart {
  @apply relative flex items-center;
}
</style>
