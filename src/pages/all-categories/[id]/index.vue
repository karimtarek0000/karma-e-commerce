<script setup lang="ts">
import VueMultiselect from "vue-multiselect";
import { SubGategory } from "types";
const { isDesktop } = useDevice();
const { $http } = useNuxtApp();
const {
  params: { id },
} = useRoute();

// ----------------------- API --------------------
const { data: categories, error: categoryError } = await useAsyncData(() =>
  $http("/categories", {
    query: { _id: id },
  })
);
const subCategories: SubGategory[] = categories.value.categories[0].subCategories;

// ----------- Data ------------
const page = ref<number>(2);
const setSubCategory = ref<SubGategory>();
const setBrand = ref<any>();

// ----------- Function ------------
const pickSubCategoryHandler = (_subCategory: SubGategory) => {
  setSubCategory.value = _subCategory;
  setBrand.value = null;
};

const listBrandClassess = (_subCategoryId: string): [string, object] => {
  return [
    "mt-3 overflow-hidden transition-all duration-500 ease-in-out ms-7 max-h-0",
    {
      "brands-list-active": _subCategoryId === setSubCategory.value?._id,
    },
  ];
};
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
              <button @click="setBrand = brand" class="btn !font-normal" type="button">
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
      <!-- Sub category image -->
      <div class="h-[15.625rem] w-[100%] flex justify-center" v-if="setSubCategory?.image">
        <nuxt-img sizes="sm:50vw lg:100vw" :src="setSubCategory?.image?.secure_url" class="res-image" :alt="setSubCategory?.name" />
      </div>

      <!-- Cards grid -->
      <div class="cards-grid">
        <!-- Card -->
        <ProductCard v-for="index in 12" :key="index" />
      </div>

      <!-- Pagination -->
      <SharePagination @changePage="page = $event" :total="200" :currentPage="page" :perPage="10" />
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
