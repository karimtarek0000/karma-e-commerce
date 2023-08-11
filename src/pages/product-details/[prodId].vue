<script setup lang="ts"></script>

<template>
  <div class="container">
    <section class="pt-12 pb-24 overflow-hidden bg-blueGray-100 rounded-b-10xl">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full px-4"></div>
          <div class="w-full px-4 mb-16 lg:w-1/2 lg:mb-0"></div>

          <!-- Col 2 -->
          <div class="w-full px-4 lg:w-1/2">
            <div class="max-w-md mb-6">
              <span class="text-xs tracking-wider text-gray-400">PRODUCT #3299803</span>
              <h2 class="mt-6 mb-4 text-2xl font-bold lg:text-3xl">Apple iPhone 12 Pro (128GB)</h2>
              <p class="flex items-center mb-6 text-2xl text-secondary">
                <span class="mr-2 font-medium">$</span>
                <span>44.90</span>
              </p>
              <p class="text-lg text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi dolorum error
                enim nostrum quia porro labore natus maxime, nobis vel odit sit necessitatibus
                similique fugiat suscipit est, accusamus fugit eum?
              </p>
            </div>
            <div class="flex items-center mb-6">
              <div class="inline-flex mr-4">rating</div>
              <span class="text-gray-400 text-md">4.59</span>
            </div>

            <!-- Quantity -->
            <div class="flex items-center mt-10 mb-20">
              <h4>Qty:</h4>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap mb-12 -mx-2">
              <div class="w-full px-2 mb-2 md:w-2/3 md:mb-0">
                <button class="addtocart" href="#">Add to Cart</button>
              </div>
              <div class="w-full px-2 md:w-1/3">
                <a class="addtofavorit" href="#">
                  <span class="mr-2">Wishlist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.addtocart {
  @apply block w-full px-2 py-4 text-xl leading-8 tracking-tighter text-center text-white bg-secondary 
  focus:ring-2 focus:ring-secondary focus:ring-opacity-50 hover:bg-secondary/90 rounded-xl;
}
.addtofavorit {
  @apply flex items-center justify-center w-full px-2 py-4 text-xl leading-8 tracking-tighter text-center bg-white 
  focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl;
}
</style>
