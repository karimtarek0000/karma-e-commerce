<script setup lang="ts">
defineProps<{
  categoryName: string;
}>();

// TODO: will remove this later
const links = [1, 2, 3, 4, 5, 6, 7];
</script>

<template>
  <div class="view view-category">
    <div class="flex">
      <div class="basis-[60%] shrink-0 p-2">
        <h2 class="category-name">{{ categoryName }}</h2>
        <hr />
        <h3 class="category-title">categories</h3>

        <div class="flex flex-col items-start mt-4 gap-y-1">
          <NuxtLink class="hover:text-blue-700" v-for="link in links" :key="link" to="/"
            >Apple</NuxtLink
          >
        </div>
      </div>

      <!--  -->
      <div class="h-full overflow-hidden bg-red-600">
        <img
          src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          alt=""
          class="res-image"
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
  @apply mt-1 uppercase text-14;
}
</style>
