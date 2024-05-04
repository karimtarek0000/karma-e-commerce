<script setup lang="ts">
// ---------- Composables -----------
const http = useHttp();

// ---------- API (Parallel) -----------
const [{ data: sliderProducts }, { data: products }] = await Promise.all([
  useAsyncData<{ sliderProducts: SliderProducts[] }>(
    "slider",
    () => http(SLIDER),
    {
      pick: ["sliderProducts"],
    }
  ),
  useAsyncData<{ products: Product[] }>(
    "top-rated-products",
    () => http(TOP_RATINGS(8)),
    {
      pick: ["products"],
    }
  ),
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
      <SwiperSlide
        v-for="product in sliderProducts?.sliderProducts"
        :key="product?.productId?._id"
      >
        <SliderSlideProduct :product="product" />
      </SwiperSlide>
    </SliderSwiper>
  </header>

  <!-- Top rated for products -->
  <section>
    <!-- Title -->
    <h2 class="title">top rated products</h2>

    <!-- Cards grid -->
    <ProductTopRated v-if="products?.products" :products="products?.products" />
  </section>

  <NuxtLink to="/products/top-rated" class="view-all-btn"
    >view all top rated</NuxtLink
  >
</template>

<style scoped>
.title {
  @apply my-12 text-2xl font-bold text-center capitalize lg:text-3xl;
}
.view-all-btn {
  @apply px-4 py-2 block mx-auto my-8 uppercase transition-colors duration-200 bg-white w-fit text-secondary hover:bg-secondary hover:text-white border border-secondary rounded-md;
}
</style>
