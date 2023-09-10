<script setup lang="ts">
import { Product } from "types";

defineProps<{
  product?: Product;
}>();
</script>

<template>
  <div class="card">
    <!-- Image -->
    <div class="h-[12.5rem]">
      <nuxt-img src="https://placehold.co/600x400" class="w-full res-image" alt="test" />
    </div>

    <div class="info-wrapper">
      <!-- Informations -->
      <div>
        <h5 class="font-bold truncate text-22">mac book pro</h5>
        <p class="mt-2 truncate text-14">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora odio ducimus dolores eligendi, nobis illo voluptates voluptatibus!
          Asperiores, placeat enim voluptas aliquam ab, ex accusamus aspernatur quisquam saepe velit eum.
        </p>
      </div>
      <!-- Price and discount -->
      <div class="flex items-center gap-2 mt-2 text-18">
        <h4 class="font-bold text-secondary">$400</h4>
        <h4 class="line-through">$400</h4>
      </div>
      <!-- Actions -->
      <button class="btn-add-cart">
        Add to cart
        <ShareRenderSVG iconName="to-cart" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply border rounded-md;
}
.info-wrapper {
  @apply px-2 py-1 capitalize;
}
.btn-add-cart {
  @apply flex items-center justify-center gap-2 w-full p-2 mt-3 mb-1 hover:bg-opacity-95 text-white rounded-md bg-secondary;
}
</style>
