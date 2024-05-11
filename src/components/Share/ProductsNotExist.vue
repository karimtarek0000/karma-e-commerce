<template>
  <div class="not-found">
    <NuxtImg
      src="/img/cartempty.svg"
      class="res-image max-sm:max-w-[40vw] mx-auto"
      fit="cover"
    />
    <h3 class="font-bold">Not exist any product yet!</h3>
    <NuxtLink to="/" class="not-found__button">Go to home page</NuxtLink>
  </div>
</template>

<style scoped>
.not-found {
  @apply max-w-[15.5rem] min-h-[16rem] mx-auto py-4 text-center;
}
.not-found__button {
  @apply block px-2 py-3 mt-4 text-white rounded-md hover:bg-secondary/95 bg-secondary;
}
</style>
