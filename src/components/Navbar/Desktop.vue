<script setup lang="ts">
const { isDesktop } = useDevice();
const { isLoggedIn } = useAuth();
</script>

<template>
  <nav class="bg-primary">
    <div class="container py-4">
      <div class="flex items-center">
        <!-- Logo -->
        <Logo class="shrink-0" />

        <!-- Search -->
        <Search />

        <!-- Actions -->
        <div class="flex items-center gap-x-3">
          <NavbarDropDown v-if="isDesktop && isLoggedIn" />
          <NuxtLink v-if="!isLoggedIn" class="btn login" to="/auth">Login</NuxtLink>
          <ActionsCart />
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
stores/auth
