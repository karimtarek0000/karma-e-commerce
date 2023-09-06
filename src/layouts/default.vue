<script setup lang="ts">
const { isDesktop } = useDevice();
</script>

<template>
  <NavbarDesktop />
  <main>
    <slot />
  </main>
  <!-- <Footer /> -->
  <NavbarMobile v-if="!isDesktop" />
</template>
