<script setup lang="ts">
const { itemStatus, toggleItemHandler } = useToggle();
const { user, isLoggedIn } = useAuth();
const links = ref([
  {
    name: "home",
    path: "/",
    icon: "home",
    status: true,
  },
  {
    name: "categories",
    path: "/all-categories",
    icon: "categories",
    status: true,
  },
  {
    name: "cart",
    path: "/cart",
    icon: "my-cart",
    status: isLoggedIn,
  },
]);
</script>

<template>
  <nav class="navbar">
    <template v-for="link in links" :key="link.name">
      <NuxtLink v-if="link.status" :to="link.path" class="link">
        <ShareRenderSVG :iconName="link.icon" sizes="w-[20px]" />
        {{ link.name }}
        <!-- Cart count - Show counter if this cart link -->
        <ActionsCartCounter v-if="link.name === 'cart'" class="!end-5" :num="1" />
      </NuxtLink>
    </template>

    <!-- For open side menu -->
    <button v-if="isLoggedIn" type="button" @click="toggleItemHandler" class="link">
      <ShareRenderSVG iconName="profile" sizes="w-[20px]" />
      settings
    </button>
  </nav>
  <!-- Side menu -->
  <Teleport to="body">
    <aside :class="['sidemenu', { 'sidemenu-active': itemStatus }]">
      <div class="flex items-center justify-between">
        <button @click="toggleItemHandler" type="button" class="text-2xl">&times;</button>
        <span class="mx-4">{{ user?.name }}</span>
      </div>
      <hr />
      <NavbarDropDown :showBtn="false" />
    </aside>
    <!-- Backdrop -->
    <div @click="toggleItemHandler" v-show="itemStatus" class="backdrop"></div>
  </Teleport>
</template>

<style scoped>
.navbar {
  @apply fixed bottom-0 shadow-[0_-6px_6px_rgba(0,0,0,0.1)] flex items-center w-full capitalize bg-white justify-stretch;
}
.link {
  @apply relative flex flex-col items-center px-2 py-2 text-14 gap-y-1 grow;
}
.sidemenu {
  @apply overflow-hidden fixed top-0 w-[200px] z-50 transition-all duration-500 shadow-lg end-[-200px] h-screen p-2 bg-white;
}

.sidemenu-active {
  @apply end-0;
}

.backdrop {
  @apply fixed z-[45] w-full h-full backdrop-blur bg-black/60;
}
:deep(.dropdown) {
  @apply w-full;
}
.router-link-active {
  @apply bg-gray-200;
}
</style>
