<script setup lang="ts">
import { useToast } from "vue-toastification";

// -------------------- Define ----------------------
const props = defineProps<{
  product: Product;
}>();

// ----------- Composables ------------
const { data: cart } = useNuxtData("cart");
const http = useHttp();
const auth = useAuth();
const toast = useToast();
const { path, query } = useRoute();

// ----------- Data ------------
const pickProduct = ref<Product | null>();

// ----------- API ------------
const {
  pending: cartLoader,
  error: cartError,
  execute: cartExcute,
} = await useAsyncData(
  () =>
    http("/cart", {
      method: "POST",
      body: {
        productId: pickProduct.value?._id,
        quantity: 1,
      },
    }),
  { immediate: false }
);

// ----------- Computed ------------
const loadingBtnCart = computed(
  () => props.product._id === pickProduct.value?._id && cartLoader.value
);
const productCartIds = computed((): string[] =>
  cart.value?.cart?.products?.map((product: CartProduct) => product.productId._id)
);

// ----------- Function ------------
const addToCardHandler = async (product: Product) => {
  if (!auth.isLoggedIn) {
    auth.$patch((store) => {
      store.dataURL = `${path}${query.subCategory ? `?subCategory=${query.subCategory}` : ""}`;
    });
    navigateTo("/auth");
    toast.error("You must be logged in first");
    return;
  }

  // ------- Add product into card ----------
  pickProduct.value = product;
  await cartExcute();

  if (!cartLoader.value && !cartError.value) {
    await refreshNuxtData("cart");
    toast.success(`Product ${product.title} added in cart successfully`);
    pickProduct.value = null;
  }

  if (cartError.value) {
    toast.error(cartError.value.message);
  }
};
</script>

<template>
  <button
    v-if="cart"
    :disabled="loadingBtnCart || productCartIds?.includes(product._id)"
    @click.prevent="addToCardHandler(product)"
    class="btn-add-cart"
  >
    <ShareLoader v-show="loadingBtnCart" />
    {{ productCartIds?.includes(product._id) ? "in cart" : "Add to cart" }}
    <ShareRenderSVG
      :iconName="productCartIds?.includes(product._id) ? 'added-to-cart' : 'to-cart'"
    />
  </button>
</template>

<style scoped>
.btn-add-cart {
  @apply flex items-center justify-center gap-2 w-full p-2 mt-3 mb-1 hover:bg-opacity-95 text-white rounded-md bg-secondary disabled:bg-secondary/80;
}
</style>
