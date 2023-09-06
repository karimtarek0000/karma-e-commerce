<script setup lang="ts"></script>

<template>
  <form class="relative me-auto">
    <!-- Search input -->
    <input class="input" type="text" placeholder="What are you looking for ?" />
    <div class="absolute top-2/4 -translate-y-2/4 end-3">
      <ShareRenderSVG iconName="search" sizes="w-[1.22rem]" />
    </div>

    <!-- Search list -->
    <div v-show="false" class="h-full search-list">
      <!-- Loader -->
      <div v-show="false" class="flex items-center justify-center h-full">
        <ShareLoader class="!border-t-primary !w-7 !h-7" />
      </div>

      <!-- Data -->
      <NuxtLink to="/" class="flex items-start px-1 py-2 gap-x-2">
        <nuxt-img sizes="sm:50px lg:70px" width="70px" height="70px" src="/logo/logo.svg" class="res-image" />
        <h5 class="text-center truncate text-14">apple</h5>
      </NuxtLink>
    </div>
  </form>
</template>

<style scoped>
.input {
  @apply px-2 py-3 leading-[0] border-0 shrink min-w-[31.25rem] text-black bg-white rounded-md text-14;
}
.search-list {
  @apply scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-track-white absolute min-h-[12.5rem] max-h-[12.5rem] overflow-auto top-[100%] w-full shadow-md p-2 rounded-md mt-2 bg-white;
}
</style>
