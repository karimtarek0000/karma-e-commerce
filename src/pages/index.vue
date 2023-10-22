<script setup lang="ts">
// ---------- Composables -----------
const http = useHttp();

// ---------- API (Parallel) -----------
const [{ data: sliderProducts }, { data: products }] = await Promise.all([
  useAsyncData<{ sliderProducts: SliderProducts[] }>(() => http("/home/slider"), {
    pick: ["sliderProducts"],
  }),
  useAsyncData<{ products: Product[] }>(() => http("/products?reviewRatings[gte]=4&size=10"), {
    pick: ["products"],
  }),
]);

// ---------- Meta -----------
useSeoMeta({
  title: "Home",
});
</script>

<template>
  <!-- Slider products -->
  <header>
    <SliderSwiper>
      <SwiperSlide v-for="product in sliderProducts?.sliderProducts" :key="product?.productId?._id">
        <SliderSlideProduct :product="product" />
      </SwiperSlide>
    </SliderSwiper>
  </header>

  <!-- Top rated for products -->
  <section>
    <!-- Title -->
    <h2 class="title">top rated products</h2>

    <!-- Cards grid -->
    <div class="cards-grid">
      <template v-for="product in products?.products" :key="product._id">
        <NuxtLink :to="`/product-details/${product._id}`">
          <ProductCard :product="product">
            <CartAddTo :product="product" />
          </ProductCard>
        </NuxtLink>
      </template>
    </div>
  </section>
</template>

<style scoped>
.cards-grid {
  @apply px-5 max-xl:px-2 grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4;
}
.title {
  @apply my-12 text-2xl font-bold text-center capitalize lg:text-3xl;
}
</style>
