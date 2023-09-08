<script setup lang="ts">
const { isDesktop } = useDevice();
</script>

<template>
  <header>
    <NavbarDesktop />
    <CategoryNavbar v-if="isDesktop" />
    <CategoryNavbarMobile v-if="!isDesktop" />
  </header>
  <main class="container">
    <slot />
  </main>
  <!-- <Footer /> -->
  <NavbarMobile v-if="!isDesktop" />
</template>
