<script setup lang="ts"></script>

<template>
  <div class="cart-view" aria-modal="true" role="dialog" tabindex="-1">
    <div class="space-y-2">
      <!-- List of products -->
      <div class="cart-view-list">
        <div v-for="index in 5" :key="index" class="flex items-center gap-1">
          <img
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
            alt=""
            class="object-cover w-16 h-16 rounded shrink-0"
          />

          <div class="max-w-full overflow-hidden">
            <h3 class="max-w-full text-black truncate text-14">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, incidunt.</h3>
            <div class="flex items-center justify-between pb-3 mt-4 border-b">
              <p class="flex items-center justify-center gap-x-3 text-14">Price: <span class="font-bold">$1000</span></p>
              <button>
                <ShareRenderSVG iconName="del" sizes="w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-2 text-center">
        <NuxtLink to="/cart" class="view-cart-btn">View my cart <span class="font-bold">(3)</span></NuxtLink>
        <NuxtLink to="/" class="checkout-btn">Checkout</NuxtLink>
      </div>
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
