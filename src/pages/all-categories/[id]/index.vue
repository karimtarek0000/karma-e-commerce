<script setup lang="ts">
import { SubGategory } from "types";
const { $http } = useNuxtApp();
const {
  params: { id },
} = useRoute();

const { data: categories, error: categoryError } = await useAsyncData(() =>
  $http("/categories", {
    query: { _id: id },
  })
);
const subCategories: SubGategory[] = categories.value.categories[0].subCategories;

// ----------- Data ------------
const subCategoryId = ref<string>("");
const brandId = ref<string>("");

// ----------- Function ------------
const pickSubCategoryHandler = (_subCategoryId: string) => {
  subCategoryId.value = _subCategoryId;
  brandId.value = "";
};

const listBrandClassess = (_subCategoryId: string): [string, object] => {
  return [
    "mt-3 overflow-hidden transition-all duration-500 ease-in-out ms-7 max-h-0",
    {
      "brands-list-active": _subCategoryId === subCategoryId.value,
    },
  ];
};
</script>

<template>
  <!-- Desktop -->
  <div class="desktop-wrapper" v-if="!categoryError">
    <!-- Aside all actions -->
    <aside class="px-4 py-4 bg-black/5">
      <!-- Name of category -->
      <h4 class="name-category">{{ categories?.categories[0]?.name }}</h4>

      <!-- All sub categories -->
      <ul class="mt-3 ms-3">
        <li v-for="subCategory in subCategories" :key="subCategory?._id">
          <button @click="pickSubCategoryHandler(subCategory?._id)" class="btn" type="button">
            <span class="wrapper-icon">
              <ShareRenderSVG v-show="subCategory?._id === subCategoryId" iconName="check" />
            </span>
            {{ subCategory?.name?.replace("men ", "") }}
          </button>

          <!-- All brands -->
          <ul :class="listBrandClassess(subCategory?._id)">
            <li v-for="brand in subCategory?.brands" :key="brand?._id" class="mb-3">
              <button @click="brandId = brand?._id" class="btn !font-normal" type="button">
                <span class="wrapper-icon">
                  <ShareRenderSVG v-show="brand?._id === brandId" iconName="check" />
                </span>
                {{ brand?.name }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <!-- All products and pagination -->
    <div class="bg-black/5">products</div>
  </div>
</template>

<style scoped>
.desktop-wrapper {
  @apply grid grid-cols-[18.75rem_1fr] gap-x-5 min-h-screen;
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
</style>
