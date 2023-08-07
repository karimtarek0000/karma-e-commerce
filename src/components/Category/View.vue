<script setup lang="ts">
defineProps<{
  categoryName: string;
}>();
</script>

<template>
  <div class="view view-category">
    <div class="wrapper">
      <div class="basis-[60%] p-2">
        <h2 class="category-name">{{ categoryName }}</h2>
        <hr />
        <h3 class="category-title">categories</h3>

        <div></div>
      </div>
      <div class="bg-red-800">image</div>
    </div>
  </div>
</template>

<style scoped>
.view-category {
  @apply opacity-0 pointer-events-none  translate-y-5 transition-all duration-500 min-h-[31.25rem] bg-white shadow-lg rounded-sm absolute top-[2.25rem] inset-0;
}

.wrapper {
  @apply flex items-center;
}
.category-name {
  @apply mb-1 font-bold capitalize text-18;
}
.category-title {
  @apply mt-1 uppercase text-14;
}
</style>
