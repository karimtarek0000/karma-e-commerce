<script setup lang="ts">
const { isDesktop } = useDevice();
</script>

<template>
  <!-- Header -->
  <header class="sticky top-0 z-40">
    <NavbarDesktop />

    <!-- ------------ NAVBARS FOR CATEGORY --------------- -->
    <!-- For desktop -->
    <div v-if="isDesktop" class="min-h-[59px] bg-primary">
      <Suspense>
        <ClientOnly>
          <LazyCategoryNavbar />
        </ClientOnly>
      </Suspense>
    </div>

    <!-- For mobile -->
    <div v-if="!isDesktop" class="min-h-[40px] bg-primary">
      <Suspense>
        <ClientOnly>
          <LazyCategoryNavbarMobile v-if="!isDesktop" />
        </ClientOnly>
      </Suspense>
    </div>
  </header>

  <main class="overflow-x-hidden max-lg:px-2 2xl:container">
    <slot />

    <!-- Footer -->
    <Footer />
  </main>

  <!-- Only for mobile  -->
  <Suspense>
    <LazyNavbarMobile v-if="!isDesktop" />
  </Suspense>

  <!-- Modal -->
  <Teleport to="body">
    <ModalController />
  </Teleport>
</template>
