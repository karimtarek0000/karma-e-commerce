<script setup lang="ts">
const { isDesktop } = useDevice();
</script>

<template>
  <header class="sticky top-0 z-40">
    <NavbarDesktop />
    <CategoryNavbar v-if="isDesktop" />
    <CategoryNavbarMobile v-if="!isDesktop" />
  </header>
  <main class="h-screen overflow-x-hidden max-lg:px-2">
    <slot />
  </main>
  <Footer />
  <NavbarMobile v-if="!isDesktop" />

  <!-- Modal -->
  <Teleport to="body">
    <ModalController />
  </Teleport>
</template>
