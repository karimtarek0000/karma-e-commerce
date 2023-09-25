<script setup lang="ts">
// ----------- Composables ------------
const http = useHttp();

// ----------------- API ------------------
const { data: cart } = await useLazyAsyncData<{ cart: Cart }>("cart", () => http("/cart"), { server: false, pick: ["cart"] });
</script>

<template>
  <div class="wrapper">
    <!-- Card -->
    <div class="card" v-for="product in cart?.cart.products" :key="product.productId?._id">
      <!-- Image -->
      <div class="h-[12.5rem] flex justify-center">
        <nuxt-img :src="product.productId?.images[0].secure_url" class="res-image" :alt="product.productId?.title" />
      </div>

      <!-- Info -->
      <div class="space-y-2">
        <h3 class="text-2xl font-bold">{{ product.productId?.title }}</h3>
        <p>{{ product.productId?.description }}</p>

        <div class="space-x-2 text-18">
          <span>{{ product.productId.priceAfterDiscount }}</span>
          <span class="line-through" v-if="product.productId?.discount">{{ product.productId?.discount }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col items-center px-3 justify-self-end gap-y-5">
        <input type="number" class="max-w-[100px] rounded-md" min="0" value="0" />
        <button class="flex items-center gap-x-2">
          <ShareLoader v-if="false" />
          <ShareRenderSVG iconName="del" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col mt-3 gap-3 overflow-hidden;
}
.card {
  @apply grid grid-cols-1 md:grid-cols-[9.375rem_1fr_12.5rem] border rounded-md gap-4 items-center;
}
</style>
