<script setup lang="ts">
const boo = ref(true);
const confirm = resolveComponent("ModalConfirm");
const order = resolveComponent("ModalOrder");
</script>

<template>
  <Transition mode="out-in">
    <Component :is="boo ? order : confirm"></Component>
  </Transition>
  <!-- <button @click="boo = !boo">toggle</button> -->
</template>

<style scoped>
.v-enter-active {
  opacity: 1;
  animation: slideUp 1s ease-in-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
