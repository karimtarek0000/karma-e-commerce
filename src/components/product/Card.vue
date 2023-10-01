<script setup lang="ts">
// -------------------- Define ----------------------
const props = defineProps<{
  product: Product;
  loader: boolean;
  productId: string;
  productCartIds: string[];
}>();

// -------------------- Computed ----------------------
const loadingBtnCart = computed(() => props.product._id === props.productId && props.loader);
</script>

<template>
  <div class="card">
    <!-- Rating -->
    <div class="absolute flex items-center top-2 start-2 gap-x-1">
      <ShareRenderSVG iconName="rating" sizes="w-[15px]" />
      <span class="text-14" v-text="product.reviewRatings" />
    </div>

    <!-- Image -->
    <div class="h-[12.5rem] flex justify-center">
      <NuxtImg
        :src="replaceCloudinaryURL(product.images[0].secure_url)"
        provider="cloudinary"
        preset="cloudinary"
        width="147"
        height="200"
        loading="lazy"
        class="res-image"
        fit="thumbnail"
        :alt="product.title"
      />
    </div>

    <!-- Informations -->
    <div class="info-wrapper">
      <div>
        <h5 class="font-bold truncate text-22">{{ product.title }}</h5>
        <p class="mt-2 truncate text-14">
          {{ product.description }}
        </p>
      </div>
      <!-- Price and discount -->
      <div class="flex items-center gap-2 mt-2 text-18">
        <h4 class="font-bold text-secondary">${{ product.priceAfterDiscount }}</h4>
        <h4 class="line-through" v-if="product.discount">${{ product.discount }}</h4>
      </div>
      <!-- Actions -->
      <button
        :disabled="loadingBtnCart || productCartIds?.includes(product._id)"
        @click="$emit('addToCart', product)"
        class="btn-add-cart"
      >
        <ShareLoader v-show="loadingBtnCart" />
        {{ productCartIds?.includes(product._id) ? "in cart" : "Add to cart" }}
        <ShareRenderSVG
          :iconName="productCartIds?.includes(product._id) ? 'added-to-cart' : 'to-cart'"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply border rounded-md overflow-hidden relative;
}
.info-wrapper {
  @apply px-2 py-1 capitalize;
}
.btn-add-cart {
  @apply flex items-center justify-center gap-2 w-full p-2 mt-3 mb-1 hover:bg-opacity-95 text-white rounded-md bg-secondary disabled:bg-secondary/80;
}
</style>
