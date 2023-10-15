<script setup lang="ts">
// ---------- Define ---------
const { options, closeModalHandler } = defineProps<{
  options: { products: OrderProduct[]; num: number };
  closeModalHandler: () => {};
}>();

// ------------- Data --------------
const productsOrder = ref<OrderProduct[]>(options?.products);
const orderNum = ref<number>(options?.num);

// ----------- Functions --------------
const goToProductDetails = (productId: string): void => {
  closeModalHandler();
  navigateTo(`product-details/${productId}`);
};
</script>

<template>
  <header class="mb-4 text-center">
    <h1 class="mb-2 font-bold capitalize text-22">Products Order #{{ orderNum }}</h1>
  </header>

  <!-- Wrapper products -->
  <div class="mt-8 mb-5 space-y-3">
    <!-- Products -->
    <div class="product-card" v-for="(product, i) in productsOrder" :key="product.productId">
      <div class="info">
        <span>{{ i + 1 }} <span class="max-md:hidden">-</span></span>
        <div class="flex items-center gap-4">
          <span class="truncate"
            ><span class="font-bold pe-2">Product:</span>{{ product?.title }}</span
          >
          <span><span class="font-bold pe-2">Quantity:</span> {{ product?.quantity }}</span>
        </div>
      </div>

      <!-- Go to product for more details about this product -->
      <button @click="goToProductDetails(product?.productId)" class="link">Go to product</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  @apply flex items-center gap-2 max-md:flex-col justify-between pb-2 border-b border-b-black/50;
}
.info {
  @apply flex items-center justify-between gap-3 max-md:flex-col;
}
.link {
  @apply underline text-secondary underline-offset-4;
}
</style>
