<script setup lang="ts"></script>

<template>
  <nav class="bg-primary">
    <div class="container py-4">
      <div class="flex items-center">
        <!-- Logo -->
        <Logo />

        <!-- Search -->
        <Search />

        <!-- Actions -->
        <div class="flex items-center">
          <ActionsCart />
          <!-- <NuxtLink class="login-btn" to="/"> login </NuxtLink> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.login-btn {
  @apply px-3 py-1 text-white rounded-md text-14 bg-primaryDarken;
}
</style>
