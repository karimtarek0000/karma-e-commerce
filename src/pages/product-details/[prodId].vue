<script setup lang="ts">
// ----------- Composables ------------
const http = useHttp();

const { data: product } = await useAsyncData("products", () => http("/products"));

// ----------- Meta ------------
useSeoMeta({
  title: "Product details",
});
</script>

<template>
  <div class="container">
    <section class="pt-12 pb-24 overflow-hidden">
      <div class="container px-4 mx-auto">
        <div class="flex -mx-4 max-lg:flex-col gap-9">
          <!-- Col 1 -->
          <div class="flex w-full gap-2 px-4 max-md:flex-col lg:w-1/2 lg:mb-0">
            <!-- Thumbnails images -->
            <div class="flex justify-between md:flex-col">
              <div
                class="w-[100px] h-[100px] p-1 rounded-md border border-secondary/50 cursor-pointer overflow-hidden"
                v-for="index in 5"
                :key="index"
              >
                <nuxt-img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  class="object-cover w-full h-full max-w-full max-h-full"
                  width="100px"
                  height="100px"
                  preload
                />
              </div>
            </div>
            <!-- Big image -->
            <div class="overflow-hidden rounded-md">
              <nuxt-img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                class="object-cover w-full h-full max-w-full max-h-full"
                width="100px"
                height="100px"
                preload
              />
            </div>
          </div>

          <!-- Col 2 -->
          <div class="px-4">
            <div class="mb-6 lg:max-w-md max-md:text-center">
              <span class="text-xs tracking-wider text-gray-400">PRODUCT #3299803</span>
              <h2 class="mt-6 mb-4 text-2xl font-bold lg:text-3xl">Apple iPhone 12 Pro (128GB)</h2>
              <p class="flex items-center mb-6 text-2xl max-md:justify-center text-secondary">
                <span class="mr-2">$</span>
                <span>44.90</span>
              </p>
              <p class="text-lg text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi dolorum error
                enim nostrum quia porro labore natus maxime, nobis vel odit sit necessitatibus
                similique fugiat suscipit est, accusamus fugit eum?
              </p>
            </div>

            <!-- Rating -->
            <div class="flex items-center mb-6 max-md:justify-center">
              <div class="inline-flex mr-4">rating</div>
              <span class="text-gray-400 text-md">4.59</span>
            </div>

            <!-- Quantity -->
            <div class="flex items-center mt-10 mb-20 max-md:justify-center">
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
