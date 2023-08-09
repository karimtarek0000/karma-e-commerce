<script setup lang="ts"></script>

<template>
  <div class="cart-view" aria-modal="true" role="dialog" tabindex="-1">
    <div class="space-y-6">
      <ul class="space-y-4">
        <li class="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
            alt=""
            class="object-cover w-16 h-16 rounded"
          />

          <div>
            <h3 class="text-sm text-gray-900">Basic Tee 6-Pack</h3>

            <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
              <div>
                <dt class="inline">Size:</dt>
                <dd class="inline">XXS</dd>
              </div>

              <div>
                <dt class="inline">Color:</dt>
                <dd class="inline">White</dd>
              </div>
            </dl>
          </div>
        </li>
      </ul>

      <div class="space-y-4 text-center">
        <NuxtLink to="/" class="view-cart-btn"> View my cart (1) </NuxtLink>
        <NuxtLink to="/" href="#" class="checkout-btn"> Checkout </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  @apply absolute top-[100%] mt-2 z-20 w-screen max-w-[18.75rem] px-4 py-8 bg-gray-100 border border-gray-600 -end-[100%] lg:px-8;
}
.view-cart-btn {
  @apply block px-5 py-3 text-sm text-gray-600 transition border border-gray-600 rounded hover:ring-1 hover:ring-gray-400;
}
.checkout-btn {
  @apply block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600;
}
</style>
