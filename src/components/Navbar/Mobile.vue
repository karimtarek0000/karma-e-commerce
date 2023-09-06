<script setup lang="ts">
const { itemStatus, toggleItemHandler } = useToggle();
const links = ref([
  {
    name: "home",
    path: "/",
    icon: "home",
  },
  {
    name: "categories",
    path: "/all-categories",
    icon: "categories",
  },
  {
    name: "cart",
    path: "/cart",
    icon: "my-cart",
  },
]);
</script>

<template>
  <nav class="navbar">
    <NuxtLink v-for="link in links" :key="link.name" :to="link.path" class="link">
      <ShareRenderSVG :iconName="link.icon" sizes="w-[20px]" />
      {{ link.name }}
    </NuxtLink>
    <!-- For open side menu -->
    <button type="button" @click="toggleItemHandler" class="link">
      <ShareRenderSVG iconName="profile" sizes="w-[20px]" />
      settings
    </button>
  </nav>
  <!-- Side menu -->
  <Teleport to="body">
    <aside :class="['sidemenu', { 'sidemenu-active': itemStatus }]">
      <button @click="toggleItemHandler" type="button" class="text-2xl">&times;</button>
    </aside>
  </Teleport>
</template>

<style scoped>
.navbar {
  @apply fixed bottom-0 shadow-[0_-6px_6px_rgba(0,0,0,0.1)] flex items-center w-full capitalize bg-white justify-stretch;
}
.link {
  @apply flex flex-col items-center px-2 py-2 text-14 gap-y-1 grow;
}
.sidemenu {
  @apply overflow-hidden absolute top-0 w-[200px] z-20 transition-all duration-500 shadow-lg end-[-200px] h-screen p-2 bg-white;
}

.sidemenu-active {
  @apply end-0;
}
</style>
