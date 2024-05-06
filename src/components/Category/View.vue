<script setup lang="ts">
defineProps<{ category: Gategory }>();
</script>

<template>
  <div class="view view-category">
    <div class="flex h-full">
      <!-- Col 1 -->
      <div class="basis-[60%] shrink-0 p-2">
        <h2 class="category-name">{{ category.name }}</h2>
        <hr />
        <h3 class="category-title">Sub Categories</h3>

        <!-- Links -->
        <div class="flex flex-col items-start mt-4 gap-y-1">
          <NuxtLink
            v-for="subCategory in category?.subCategories"
            :key="subCategory._id"
            :to="`/all-categories/${category?._id}?subCategory=${subCategory?._id}`"
            class="capitalize hover:text-blue-700"
            >{{ subCategory.name.replace("men ", "") }}</NuxtLink
          >
        </div>
      </div>

      <!-- Col 2 -->
      <div class="w-full overflow-hidden bg-red">
        <NuxtImg
          :src="replaceCloudinaryURL(category?.image?.secure_url)"
          provider="cloudinary"
          preset="cloudinary"
          class="w-full res-image"
          width="100%"
          height="500"
          fit="cover"
          :alt="category?.name"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-category {
  @apply opacity-0 pointer-events-none  translate-y-5 transition-all duration-500 h-[31.25rem] bg-white shadow-lg rounded-sm absolute top-[2.25rem] inset-0 overflow-hidden;
}

.category-name {
  @apply mb-1 font-bold capitalize text-18;
}
.category-title {
  @apply mt-1 uppercase text-14 font-bold;
}
</style>
