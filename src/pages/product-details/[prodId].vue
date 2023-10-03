<script setup lang="ts">
// ----------- Composables ------------
const { isDesktop } = useDevice();
const http = useHttp();
const {
  params: { prodId },
} = useRoute();
const { handleMouseMove, mainImageRef, viewImageRef } = useZoomImg();

// ----------- API ------------
const { data: product } = await useAsyncData<{ product: Product }>(
  "product",
  () => http(`/products/${prodId}`),
  {
    pick: ["product"],
  }
);

// ----------- Data ------------
const imgSelected = ref<{ secure_url: string; public_id: string }>(
  product.value?.product.images[0]!
);

// ----------- Meta ------------
useSeoMeta({
  title: `${product.value?.product.title}`,
  description: `${product.value?.product.description}`,
});
</script>

<template>
  <div class="container">
    <section class="pt-12 pb-24 overflow-hidden">
      <div class="container px-4 mx-auto">
        <div class="flex justify-start -mx-4 max-lg:flex-col gap-9">
          <!-- Col 1 -->
          <div class="col1">
            <!-- Thumbnails images -->
            <div class="flex justify-start gap-3 md:flex-col">
              <div
                v-for="image in product?.product.images"
                :key="image.public_id"
                class="thumbnail-img"
                :class="imgSelected.public_id === image.public_id && '!border-secondary/90'"
                @click="imgSelected = image"
              >
                <NuxtImg
                  :src="replaceCloudinaryURL(image.secure_url)"
                  provider="cloudinary"
                  preset="cloudinary"
                  class="res-image"
                  width="100"
                  height="122"
                  fit="thumbnail"
                  :alt="image.public_id"
                />
              </div>
            </div>

            <!-- Big image -->
            <div class="relative big-img">
              <img
                v-if="isDesktop"
                class="res-image"
                ref="mainImageRef"
                :src="imgSelected?.secure_url as string"
                :alt="imgSelected?.public_id"
                @mousemove="handleMouseMove"
              />
              <img
                v-else
                class="res-image"
                :src="imgSelected?.secure_url as string"
                :alt="imgSelected?.public_id"
              />

              <!-- zoom image -->
              <div class="parent-magnified-image" v-if="isDesktop">
                <div ref="viewImageRef" class="magnified-image" />
              </div>
            </div>
          </div>

          <!-- Col 2 -->
          <div class="px-4">
            <div class="mb-6 lg:max-w-md max-md:text-center">
              <!-- Title -->
              <h2
                class="mt-6 mb-4 text-2xl font-bold lg:text-3xl"
                v-text="product?.product.title"
              />

              <!-- Discription -->
              <p class="mb-3 text-lg text-black" v-text="product?.product.description" />

              <!-- Price and discount -->
              <p class="priceAndDiscount">
                <span>$ {{ product?.product.priceAfterDiscount }}</span>
                <span class="line-through" v-if="product?.product.discount">{{
                  product?.product.discount
                }}</span>
              </p>
            </div>

            <!-- Rating -->
            <div class="rating">
              <ShareRenderSVG iconName="rating" />
              <span class="text-18" v-text="product?.product.reviewRatings" />
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap mb-12 -mx-2">
              <div class="w-full px-2 mb-2 md:w-2/3 md:mb-0">
                <ClientOnly>
                  <CartAddTo :product="(product?.product as Product)" />
                </ClientOnly>
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
.col1 {
  @apply flex w-full gap-2 px-4 max-md:flex-col lg:w-1/2 lg:mb-0;
}
.priceAndDiscount {
  @apply flex items-center gap-2 mb-6 text-2xl max-md:justify-center text-secondary;
}
.rating {
  @apply flex items-center gap-2 mb-6 max-md:justify-center;
}
.quantity {
  @apply flex items-center mt-10 mb-20 max-md:justify-center;
}
.thumbnail-img {
  @apply w-[100px] h-[122px] p-1 overflow-hidden border-2 rounded-md cursor-pointer border-secondary/20;
}
.big-img {
  @apply flex justify-center w-full max-lg:h-[12.5rem] min-h-[29.75rem] border-2 rounded-md border-secondary/20;
}

/* Zoom image */
.big-img:hover .parent-magnified-image {
  @apply !flex;
}
.parent-magnified-image {
  @apply justify-center hidden overflow-hidden absolute top-0 w-full h-full border start-full border-secondary/90;
}
.magnified-image {
  @apply bg-white scale-110 h-full w-full;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
