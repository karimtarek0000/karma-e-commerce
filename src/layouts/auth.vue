<script setup lang="ts"></script>

<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section
        class="relative flex items-end h-32 bg-secondary lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <NuxtImg
          src="photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          provider="unsplash"
          preset="unsplash"
          class="absolute inset-0 w-full res-image opacity-80"
          sizes="sm:50vw md:60vw lg:70vw xl:90vw"
          alt="auth"
        />

        <!-- Logo and info -->
        <div class="hidden lg:relative lg:block lg:p-12">
          <a class="block text-white" href="/">
            <span class="sr-only">Home</span>
          </a>

          <h2 class="mt-6 text-2xl font-bold text-secondary sm:text-3xl md:text-4xl">
            Welcome to karma
          </h2>

          <p class="mt-4 leading-relaxed text-white/90">e-commerce</p>
        </div>
      </section>

      <main class="flex flex-col items-center justify-center py-8 lg:py-12 lg:col-span-6">
        <Logo />
        <slot />
      </main>
    </div>
  </section>
</template>
