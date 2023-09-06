<script setup lang="ts">
const sideMenuStatus = ref<boolean>(false);
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
    icon: "cart",
  },
]);

// ------------ Functions ------------
const toggleSideMenu = (): boolean => (sideMenuStatus.value = !sideMenuStatus.value);
</script>

<template>
  <div class="relative h-screen overflow-hidden bg-red-400">
    <nav class="navbar">
      <NuxtLink v-for="link in links" :key="link.name" :to="link.path" class="link">
        <ShareRenderSVG :iconName="link.icon" sizes="w-[20px]" />
        {{ link.name }}
      </NuxtLink>
      <!-- For open side menu -->
      <button type="button" @click="toggleSideMenu" class="link">
        <ShareRenderSVG iconName="profile" sizes="w-[20px]" />
        settings
      </button>
    </nav>
    <!-- Side menu -->
    <aside :class="['sidemenu', { 'sidemenu-active': sideMenuStatus }]">
      <button @click="toggleSideMenu" type="button" class="text-2xl">&times;</button>
    </aside>
  </div>
</template>

<style scoped>
.navbar {
  @apply fixed bottom-0 shadow-[0_-6px_6px_rgba(0,0,0,0.1)] flex items-center w-full capitalize bg-white justify-stretch;
}
.link {
  @apply flex flex-col items-center px-2 py-2 text-14 gap-y-1 grow;
}
.sidemenu {
  @apply absolute top-0 w-[200px] transition-all duration-500 shadow-lg end-[-200px] h-screen p-2 bg-white;
}
.sidemenu-active {
  @apply end-0;
}
</style>
