<script setup lang="ts">
const { isDesktop } = useDevice();
const { modalControllerRef, openModalHandler } = useModalController();

const test = async () => {
  openModalHandler({
    $modalType: "confirm",
    $classes: "!items-start",
    $pickText: "deleteProduct",
  });
  await modalControllerRef?.value?.confirmHandler();
};
</script>

<template>
  <header class="sticky top-0 z-40">
    <NavbarDesktop />
    <CategoryNavbar v-if="isDesktop" />
    <CategoryNavbarMobile v-if="!isDesktop" />
  </header>
  <main class="container">
    <slot />
  </main>
  <Footer />
  <NavbarMobile v-if="!isDesktop" />

  <!-- Modal -->
  <Teleport to="body">
    <ModalController :ref="modalControllerRef" />
  </Teleport>

  <button @click="test">open modal</button>
</template>
