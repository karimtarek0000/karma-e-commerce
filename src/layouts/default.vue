<script setup lang="ts">
const { isDesktop } = useDevice();
</script>

<template>
  <!-- Header -->
  <header class="sticky top-0 z-40">
    <NavbarDesktop />
    <CategoryNavbar v-if="isDesktop" />
    <CategoryNavbarMobile v-if="!isDesktop" />
  </header>

  <main class="overflow-x-hidden max-lg:px-2 2xl:container">
    <slot />

    <!-- Footer -->
    <Footer />
  </main>

  <!-- Only for mobile  -->
  <NavbarMobile v-if="!isDesktop" />

  <!-- Modal -->
  <Teleport to="body">
    <ModalController />
  </Teleport>
</template>
