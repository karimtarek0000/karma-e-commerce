<script setup lang="ts">
// ----------- Composables ------------
const http = useHttp();
const route = useRoute();

// ----------- API ------------
const { data: product } = await useAsyncData<{ product: Product }>(
  "product",
  () => http(`/products/${route.params.prodId}`),
  {
    pick: ["product"],
  }
);

// ----------- Data ------------
const magnification = 0.5;
const mainImageRef = ref<null>();
const viewImageRef = ref<any>();
const imgSelected = ref<{ secure_url: string; public_id: string }>(
  product.value?.product.images[0]!
);

// ----------- Meta ------------
useSeoMeta({
  title: "Product details",
});

const handleMouseMove = (event: any) => {
  const mainImage = mainImageRef.value as any;

  const rect = mainImage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const backgroundPosition = `-${x * magnification}px -${y * magnification}px`;

  viewImageRef.value.style.backgroundImage = `url(${mainImage.src})`;
  viewImageRef.value.style.backgroundPosition = backgroundPosition;
};
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
                :src="imgSelected?.secure_url as string"
                ref="mainImageRef"
                class="res-image"
                :alt="imgSelected?.public_id"
                @mousemove="handleMouseMove"
                @touchmove="handleMouseMove"
              />

              <!-- Image zoom -->
              <div class="parent-magnified-image">
                <div ref="viewImageRef" class="magnified-image" />
              </div>
            </div>
          </div>

          <!-- Col 2 -->
          <div class="px-4">
            <div class="mb-6 lg:max-w-md max-md:text-center">
              <h2
                class="mt-6 mb-4 text-2xl font-bold lg:text-3xl"
                v-text="product?.product.title"
              />
              <p class="mb-3 text-lg text-black" v-text="product?.product.description" />

              <p class="flex items-center mb-6 text-2xl max-md:justify-center text-secondary">
                <span class="mr-2">$</span>
                <span>44.90</span>
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
.thumbnail-img {
  @apply w-[100px] h-[122px] p-1 overflow-hidden border-2 rounded-md cursor-pointer border-secondary/20;
}
.big-img {
  @apply flex justify-center w-full border-2 rounded-md border-secondary/20;
}
.big-img:hover .parent-magnified-image {
  @apply !flex;
}
.parent-magnified-image {
  @apply justify-center hidden overflow-hidden absolute top-0 w-full h-full border start-full border-secondary/90;
}
.magnified-image {
  @apply w-full h-full bg-white scale-110;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
