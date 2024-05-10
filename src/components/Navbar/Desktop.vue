<script setup lang="ts">
const { isDesktop } = useDevice();
const { isLoggedIn, loggedIn } = useAuth();

const desktopAndLoggedIn = computed((): boolean => isDesktop && isLoggedIn);
</script>

<template>
  <nav class="bg-primary">
    <div class="container py-4">
      <div class="flex flex-wrap items-center px-2">
        <!-- Logo -->
        <Logo class="shrink-0" />

        <!-- Search -->
        <Search class="max-lg:order-last max-lg:mt-3" />

        <!-- Actions -->
        <div class="flex items-center gap-x-3 max-lg:ms-auto">
          <LazyNavbarDropDown v-if="desktopAndLoggedIn" />
          <NuxtLink v-if="!loggedIn" class="btn login" to="/auth"
            >Login</NuxtLink
          >
          <div class="min-w-[25px]">
            <Suspense>
              <LazyActionsCart v-if="desktopAndLoggedIn" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md text-14;
}
.login {
  @apply bg-secondary text-white;
}
.signup {
  @apply text-black border border-secondary hover:bg-secondary hover:text-white transition-colors duration-200;
}
</style>
