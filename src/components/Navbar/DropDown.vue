<script setup lang="ts">
const { showBtn } = withDefaults(
  defineProps<{
    showBtn?: boolean;
  }>(),
  {
    showBtn: true,
  }
);
const { itemStatus, toggleItemHandler } = useToggle(!showBtn);
const { logout, user } = useAuth();
</script>

<template>
  <div class="relative">
    <!-- Button toggle dropdown -->
    <button v-if="showBtn" @click="toggleItemHandler" class="flex justify-between px-2 bg-white rounded-md gap-x-4">
      {{ user?.name }}
      <ShareRenderSVG iconName="arrow-down" sizes="w-[13px]" />
    </button>
    <!-- Dropdown -->
    <ul class="dropdown" v-show="itemStatus">
      <NuxtLink class="dropdown-link" to="/cart">
        <ShareRenderSVG iconName="cart" class="w-[15px]" />
        <span class="ms-auto pe-5">my cart</span>
      </NuxtLink>
      <button @click="logout" class="dropdown-link">
        <ShareRenderSVG iconName="logout" class="w-[15px]" />
        <span class="ms-auto pe-5">logout</span>
      </button>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  @apply absolute overflow-hidden shadow-md bg-white w-[7.5rem] mt-2 z-10 rounded-md top-[100%] end-0;
}
.dropdown-link {
  @apply flex items-center p-2 capitalize gap-x-5 text-14 hover:bg-gray-200 w-full;
}
</style>
