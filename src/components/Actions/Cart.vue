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
  "cartShopping",
  () => http(CART),
  {
    pick: ["cart"],
    // server: false,
  }
);

// ----------- Computed ------------
const productsLength = computed(
  (): number => cart.value?.cart?.products?.length as number
);

// ----------- Functions ------------
const toggleQuickViewHandler = () => {
  toggleCartQuickView.value = !toggleCartQuickView.value;
};
</script>

<template>
  <div class="cart">
    <!-- Toggle to open and close cart -->
    <button @click="toggleQuickViewHandler">
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
      v-show="toggleCartQuickView"
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
