<script setup lang="ts">
// ---------- Define ----------
const { showBtn } = withDefaults(
  defineProps<{
    showBtn?: boolean;
  }>(),
  {
    showBtn: true,
  }
);

// ---------- Composables ----------
const { itemStatus, toggleItemHandler } = useToggle(!showBtn);
const { logout, user } = useAuth();

// ---------- Data ----------
const links = ref([
  {
    title: "my cart",
    path: "/cart",
    icon: "cart",
  },
  {
    title: "my orders",
    path: "/orders",
    icon: "added-to-cart",
  },
]);
</script>

<template>
  <div class="relative">
    <!-- Button toggle dropdown -->
    <button v-if="showBtn" @click="toggleItemHandler" class="dropdown-toggle">
      {{ user?.name }}
      <ShareRenderSVG iconName="arrow-down" sizes="w-[13px]" />
    </button>
    <!-- Dropdown -->
    <ul class="dropdown" v-show="itemStatus" @click="toggleItemHandler">
      <NuxtLink
        v-for="link in links"
        :key="link.title"
        class="dropdown-link"
        :to="link.path"
      >
        <ShareRenderSVG :iconName="link.icon" class="w-[15px]" />
        <span v-text="link.title" />
      </NuxtLink>
      <button @click="logout" class="dropdown-link">
        <ShareRenderSVG iconName="logout" class="w-[15px]" />
        <span>logout</span>
      </button>
    </ul>
  </div>
</template>

<style scoped>
.dropdown-toggle {
  @apply flex justify-between px-4 py-2 bg-white rounded-md gap-x-4;
}
.dropdown {
  @apply absolute overflow-hidden  shadow-md bg-white w-[9rem] mt-2 z-10 rounded-md top-[100%] end-0;
}
.dropdown-link {
  @apply flex justify-start items-center p-2 capitalize gap-x-5 text-14 hover:bg-gray-200 w-full;
}
</style>
