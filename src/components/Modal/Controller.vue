<script setup lang="ts">
// ------------- Composables --------------
const { toggleModal, modalName, classes } = useModalController();

// ------------- Data --------------
const confirmStatus = ref();
const comp = reactive<any>({
  confirm: shallowRef(resolveComponent("ModalConfirm")),
  order: shallowRef(resolveComponent("ModalOrder")),
});

// ------------- Functions --------------
const confirmHandler = (): Promise<boolean> =>
  new Promise((resolve) => (confirmStatus.value = resolve));
const closeModalHandler = (): string => (modalName.value = "");
const confirmStatusHandler = (status: boolean): void => {
  if (!status) closeModalHandler();
  confirmStatus.value(status);
};

// ------ For expose any you want -------
defineExpose({ confirmHandler });
</script>

<template>
  <Transition name="fade">
    <div class="modal" :class="classes" v-if="toggleModal">
      <Transition name="slide" mode="out-in" :appear="true" @afterLeave="toggleModal = false">
        <div class="modal__wrapper" v-if="modalName">
          <!-- Close -->
          <button class="text-3xl" @click="closeModalHandler">&times;</button>

          <!-- Modal -->
          <Component :is="comp[modalName]" v-bind="{ confirmStatusHandler }" />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
@import "@/assets/style/modal.css";
</style>
