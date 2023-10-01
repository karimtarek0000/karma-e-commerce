<script setup lang="ts">
import VueMultiselect from "vue-multiselect";
import { useToast } from "vue-toastification";

// ----------- Composables ------------
const { data: cart } = useNuxtData("cart");
const { isDesktop } = useDevice();
const auth = useAuth();
const http = useHttp();
const toast = useToast();
const {
  path,
  params: { id },
  query,
} = useRoute();

// ----------- Data ------------
const pageNumber = ref<number>(+query?.page! || 1);
const setSubCategory = ref<SubGategory | null>();
const setBrand = ref<Brand | null>();
const pickProduct = ref<Product>();

// ----------------------- API --------------------
// For category
const { data: categories, error: categoryError } = await useAsyncData(() =>
  http("/categories", {
    query: { _id: id },
  })
);
const subCategories: SubGategory[] = categories?.value?.categories[0]?.subCategories;

// For get products
const {
  data: allProducts,
  error: productsError,
  pending: productsLoading,
  execute,
} = await useAsyncData(
  () =>
    http("/products", {
      query: {
        categoryId: id,
        subCategoryId: setSubCategory.value?._id,
        brandId: setBrand.value?._id,
        page: pageNumber.value,
        size: 8,
      },
    }),
  {
    watch: [pageNumber, setSubCategory, setBrand],
  }
);

// For add product in cart
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

const products = ref<Product[]>(allProducts.value?.products);
const metaDataPaginForProducts = ref(allProducts?.value?.metaData);

// ----------- Meta ------------
useSeoMeta({
  title: `${categories.value?.categories[0]?.name} - category`,
});

// ----------- Computed ------------
const cartProductsIds = computed((): string[] =>
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
    toast.success(`Product ${product.title} added in cart successfully`);
    auth.changeAddInCartStatus(true);
  }

  if (cartError.value) {
    toast.error(cartError.value.message);
  }
};
const pickSubCategoryHandler = (_subCategory: SubGategory): void => {
  // Render all category products if user clicked again on the same subcategory
  setBrand.value = null;
  if (setSubCategory.value?._id === _subCategory._id) {
    setSubCategory.value = null;
    return;
  }
  setSubCategory.value = _subCategory;
  pageNumber.value = 1;
};
const pickBrandHandler = (brand: Brand): void => {
  if (setBrand.value?._id === brand._id) {
    setBrand.value = null;
    return;
  }
  setBrand.value = brand;
};
const listBrandClassess = (_subCategoryId: string): [string, object] => {
  return [
    "mt-3 overflow-hidden transition-all duration-500 ease-in-out ms-7 max-h-0",
    {
      "brands-list-active": _subCategoryId === setSubCategory.value?._id,
    },
  ];
};

// ----------- Watches ------------
watch(allProducts, (values) => {
  products.value = values.products;
  metaDataPaginForProducts.value = values.metaData;
});

watch(
  () => query.subCategory,
  (value) => {
    if (value) {
      const subCategory = subCategories.find((subCategory) => subCategory._id === value);
      if (subCategory) {
        pickSubCategoryHandler(subCategory);
      }
    }
  },
  {
    immediate: true,
  }
);

// ----------- Lifecycle ------------
onMounted(() => {
  auth.$patch((store) => {
    store.dataURL = "";
  });
});

// ----------- Handling Errors ------------
if (!categories?.value?.categories.length) {
  throw showError({
    statusCode: 404,
    message: "This id not found",
  });
}
if (categoryError.value || productsError.value) {
  throw showError({
    statusCode: categoryError.value?.statusCode || productsError.value?.statusCode,
    message: categoryError.value?.message || productsError.value?.message,
  });
}
</script>

<template>
  <div class="wrapper" v-if="!categoryError">
    <!-- Aside all actions -->
    <aside class="px-4 py-4 bg-black/5" v-if="isDesktop">
      <!-- Name of category -->
      <h4 class="name-category">{{ categories?.categories[0]?.name }}</h4>

      <!-- All sub categories -->
      <ul class="mt-3 ms-3">
        <li v-for="subCategory in subCategories" :key="subCategory?._id">
          <button @click="pickSubCategoryHandler(subCategory)" class="btn" type="button">
            <span class="wrapper-icon">
              <ShareRenderSVG v-show="subCategory?._id === setSubCategory?._id" iconName="check" />
            </span>
            {{ subCategory?.name?.replace("men ", "") }}
          </button>

          <!-- All brands -->
          <ul :class="listBrandClassess(subCategory?._id)">
            <li v-for="brand in subCategory?.brands" :key="brand?._id" class="mb-3">
              <button @click="pickBrandHandler(brand)" class="btn !font-normal" type="button">
                <span class="wrapper-icon">
                  <ShareRenderSVG v-show="setBrand?._id === brand?._id" iconName="check" />
                </span>
                {{ brand?.name }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <!-- Selection for subcategories and brands for other devices -->
    <div class="flex flex-wrap items-center gap-3 px-1 my-2" v-if="!isDesktop">
      <div class="max-sm:w-full grow">
        <h4 class="mb-2">Sub category</h4>
        <VueMultiselect
          v-model="setSubCategory"
          :options="subCategories"
          :searchable="false"
          :allow-empty="false"
          deselect-label=""
          placeholder="Select sub category"
          label="name"
          track-by="name"
          selectLabel=""
        >
        </VueMultiselect>
      </div>

      <div class="grow" v-if="setSubCategory">
        <h4 class="mb-2">Brand</h4>
        <VueMultiselect
          v-model="setBrand"
          :options="setSubCategory?.brands"
          :searchable="false"
          :allow-empty="false"
          deselect-label=""
          placeholder="Select brand"
          label="name"
          track-by="name"
          selectLabel=""
        >
        </VueMultiselect>
      </div>
    </div>

    <!-- All products and pagination -->
    <div class="max-h-screen overflow-auto scrollbar-none">
      <!-- Pagination -->
      <ClientOnly>
        <SharePagination
          class="mb-5"
          v-if="metaDataPaginForProducts?.totalOfPages > 1"
          :total="metaDataPaginForProducts?.totalCountProducts"
          :perPage="metaDataPaginForProducts?.limit"
          :currentPage="pageNumber"
          @changePage="pageNumber = $event"
        />
      </ClientOnly>

      <!-- Sub category image -->
      <div
        class="h-[15.625rem] w-[100%] flex justify-center overflow-hidden"
        v-if="setSubCategory?.image"
      >
        <NuxtImg
          :src="replaceCloudinaryURL(setSubCategory?.image?.secure_url)"
          provider="cloudinary"
          preset="cloudinary"
          class="res-image"
          sizes="sm:70vw lg:90vw xl:100vw"
          fit="cover"
          :alt="setSubCategory?.name"
        />
      </div>

      <!-- Cards grid -->
      <div class="cards-grid">
        <!-- Card -->
        <LoadersCardProduct v-if="productsLoading" v-for="index in 8" :key="index" />
        <ProductCard
          v-else
          v-for="product in products"
          :key="product._id"
          :product="product"
          :loader="cartLoader"
          :productCartIds="cartProductsIds"
          :productId="(pickProduct?._id as string) || ''"
          @addToCart="addToCardHandler"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply grid grid-cols-1 xl:grid-cols-[18.75rem_1fr] gap-x-5 min-h-screen;
}
.name-category {
  @apply font-bold text-center py-2 capitalize border-b-[1px] text-secondary text-22 border-b-secondary;
}
.btn {
  @apply flex items-center capitalize gap-x-2 font-bold;
}
.wrapper-icon {
  @apply w-[20px] h-[20px] flex justify-center items-center rounded-full border border-secondary;
}
.brands-list-active {
  @apply max-h-[500px];
}
.cards-grid {
  @apply max-xl:px-2 grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4;
}
</style>
