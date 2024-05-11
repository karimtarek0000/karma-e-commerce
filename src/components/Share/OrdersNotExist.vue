<template>
  <div class="flex flex-col items-center my-16">
    <div class="max-w-[15.5rem]">
      <NuxtImg
        src="/img/orders.svg"
        class="res-image max-sm:max-w-[40vw] mx-auto"
        fit="cover"
      />
    </div>
    <h1 class="mt-2 font-bold text-center text-18">No any order yet!</h1>
    <NuxtLink to="/" class="px-3 py-2 mt-3 text-white rounded-md bg-secondary">
      Go to home
    </NuxtLink>
  </div>
</template>
