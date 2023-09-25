<script setup lang="ts">
import { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

defineProps<{
  products: CartProduct[];
  total: number;
  productId: string;
  statusLoader: AsyncDataRequestStatus;
}>();
</script>

<template>
  <div class="cart-view" aria-modal="true" role="dialog" tabindex="-1">
    <!-- List of products and actions -->
    <div v-if="products?.length" class="space-y-2">
      <!-- List of products -->
      <div class="cart-view-list">
        <div v-for="product in products" :key="product.productId._id" class="flex items-center gap-1">
          <!-- Image -->
          <nuxt-img :src="product.productId.images[0].secure_url" class="object-cover w-10 h-16 rounded shrink-0" />

          <div class="w-full max-w-full overflow-hidden">
            <h3 class="max-w-full mb-2 font-bold text-black truncate text-14" v-text="product.productId.title" />
            <div class="flex items-center justify-between border-b">
              <p class="flex items-center justify-center gap-x-3 text-14">
                Price: <span class="font-bold">${{ product.productId.priceAfterDiscount.toLocaleString() }}</span>
              </p>

              <!-- For delete product from cart -->
              <button @click="$emit('deleteProduct', product)">
                <ShareRenderSVG v-show="product.productId._id !== productId" iconName="del" sizes="w-[18px]" />
                <ShareLoader
                  class="w-[25px] h-[25px] !border-t-secondary"
                  v-show="statusLoader === 'pending' && product.productId._id === productId"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-2 text-center">
        <h6><span class="font-bold">Total</span>: ${{ total.toLocaleString() }}</h6>
        <NuxtLink to="/cart" class="view-cart-btn"
          >View my cart <span class="font-bold">({{ products?.length }})</span></NuxtLink
        >
        <NuxtLink to="/" class="checkout-btn">Checkout</NuxtLink>
      </div>
    </div>

    <!-- If not products exist -->
    <div v-else class="flex flex-col items-center gap-2 text-center capitalize">
      <p>No products found</p>
      <ShareRenderSVG iconName="cart" />
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  @apply absolute rounded-md shadow-xl top-[100%] mt-2 z-20 w-screen max-w-[18.75rem] p-3 bg-white -end-[100%];
}
.cart-view-list {
  @apply space-y-4 max-h-[14.375rem] overflow-auto scrollbar-none;
}
.view-cart-btn {
  @apply block px-5 py-3 text-sm text-black transition border border-secondary rounded hover:ring-1 hover:ring-secondary;
}
.checkout-btn {
  @apply block px-5 py-3 text-sm text-gray-100 transition bg-secondary rounded hover:bg-secondary/90;
}
</style>
