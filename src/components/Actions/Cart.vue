<script setup lang="ts">
// ----------- Composables ------------
const http = useHttp();
const auth = useAuth();

// ----------- Data ------------
const toggleCartQuickView = ref<boolean>(false);

// ----------- API ------------
const { data: cart, error, pending, execute } = await useLazyAsyncData<{ cart: Cart }>(() => http("/cart"), { server: false, pick: ["cart"] });

// ----------- Computed ------------
const productsLength = computed((): number => cart.value?.cart?.products?.length as number);

// ----------- Watches ------------
watch(
  () => auth.addInCartStatus,
  () => {
    execute();
    auth.changeAddInCartStatus(false);
  }
);
</script>

<template>
  <div class="cart">
    <!-- Toggle to open and close cart -->
    <button @click="toggleCartQuickView = !toggleCartQuickView">
      <ActionsCartCounter v-show="!!productsLength" :num="productsLength" />
      <ShareRenderSVG iconName="cart" />
    </button>

    <!-- Show all products if exist -->
    <ActionsCartQuickView v-show="toggleCartQuickView" :products="cart?.cart.products as []" />
  </div>
</template>

<style scoped>
.cart {
  @apply relative flex items-center;
}
</style>
