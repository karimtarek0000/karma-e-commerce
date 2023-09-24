<script setup lang="ts">
// ----------- Composables ------------
const { $http } = useNuxtApp();

// ----------- Data ------------
const toggleCartQuickView = ref<boolean>(false);

// ----------- API ------------
const { data: cart, error, pending } = await useAsyncData<{ cart: Cart }>(() => $http("/cart"), { server: false, pick: ["cart"] });

console.log(cart.value);
</script>

<template>
  <div class="cart">
    <!-- Toggle to open and close cart -->
    <button @click="toggleCartQuickView = !toggleCartQuickView">
      <ActionsCartCounter :num="(cart?.cart.products?.length as number)" />
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
