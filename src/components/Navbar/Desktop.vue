<script setup lang="ts">
import { useAuth } from "@/store/auth";
const { logout } = useAuth();
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
        <div class="flex items-center">
          <button @click="logout" class="mx-2 btn signup" to="/">Logout</button>
          <ActionsCart />
          <!-- <div class="space-x-2">
            <NuxtLink class="btn login" to="/">Login</NuxtLink>
            <NuxtLink class="btn signup" to="/">Signup</NuxtLink>
          </div> -->
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
