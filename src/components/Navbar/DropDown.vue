<script setup lang="ts">
const { itemStatus, toggleItemHandler } = useToggle();
const { logout, user } = useAuth();
</script>

<template>
  <div class="relative">
    <!-- Button toggle dropdown -->
    <button @click="toggleItemHandler" class="flex justify-between px-2 bg-white rounded-md gap-x-4">
      {{ user?.name }}
      <ShareRenderSVG iconName="arrow-down" sizes="w-[13px]" />
    </button>
    <!-- Dropdown -->
    <ul class="dropdown" v-show="itemStatus">
      <NuxtLink class="dropdown-links" to="/cart">
        <ShareRenderSVG iconName="cart" class="w-[15px]" />
        my cart
      </NuxtLink>
      <button @click="logout" class="dropdown-links">
        <ShareRenderSVG iconName="logout" class="w-[15px]" />
        logout
      </button>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  @apply absolute overflow-hidden shadow-md bg-white w-[120px] mt-2 z-10 rounded-md top-[100%] end-0;
}
.dropdown-links {
  @apply flex items-center p-2 capitalize gap-x-5 text-14 hover:bg-gray-200 w-full;
}
</style>
