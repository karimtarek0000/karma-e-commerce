<template>
  <div class="card animate-pulse">
    <div class="h-[12.5rem] bg-slate-700/20" />

    <div class="flex flex-col gap-2 px-2 py-1 mt-2">
      <div class="h-7 bg-slate-700/20" />
      <div class="h-5 mb-3 bg-slate-700/20" />

      <div class="flex items-center gap-3 max-md:justify-center">
        <div class="h-4 w-[100px] bg-slate-700/20" />
        <div class="h-4 w-[100px] bg-slate-700/20" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply grid grid-cols-1 md:grid-cols-[9.375rem_1fr_12.5rem] border rounded-md gap-4 items-center;
}
</style>
