<script setup lang="ts">
const config = useRuntimeConfig();
const resetError = async (error: string) => {
  await navigateTo("/");
  error.value = null;
};

useSeoMeta({
  title: "Home",
  ogTitle: "Karma ecommerce",
  ogDescription:
    "Shop the Best Products & Brands in Egypt. Same Day Delivery ✓ Cash on Delivery ✓ Easy Free Returns ✓ Credit Cards & Debit Cards",
  ogUrl: config.public.URL,
  ogImage:
    "https://www.flutterclutter.dev/images/posts/2020-07-24-flutter-game-tutorial-fruit-ninja-clone/flutter-fruit-ninja-clone.png",
});
</script>

<template>
  <NuxtLayout>
    <!-- Progress for routing -->
    <NuxtLoadingIndicator color="#454692" />

    <NuxtErrorBoundary>
      <!-- Pages -->
      <NuxtPage />

      <!-- Error boundry -->
      <template #error="{ error }">
        <div class="flex flex-col items-center gap-3 mx-auto mt-5 w-fit">
          <h2 class="px-3 py-2 mx-auto text-white bg-red-500 rounded-md">
            Oh no, something went wrong
            <strong>{{ error.value.message }}</strong>
          </h2>
          <button
            class="px-3 py-1 text-white rounded-md bg-secondary"
            @click="resetError(error)"
          >
            Reset error
          </button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>
