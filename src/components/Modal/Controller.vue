<script setup lang="ts">
// ------------- Composables --------------
const {
  toggleModal,
  modalName,
  classes,
  pickText,
  otherOptions,
  closeModalHandler,
  confirmStatusHandler,
} = useModalController();

// -------------- Components --------------
const comp = reactive<any>({
  confirm: shallowRef(resolveComponent("ModalConfirm")),
  order: shallowRef(resolveComponent("ModalOrder")),
});
</script>

<template>
  <Transition name="fade">
    <div class="modal" :class="classes" v-if="toggleModal">
      <Transition name="slide" mode="out-in" :appear="true" @afterLeave="toggleModal = false">
        <div class="modal__wrapper" v-if="modalName">
          <!-- Close -->
          <button class="text-3xl" @click="closeModalHandler">&times;</button>

          <!-- Modal -->
          <Component
            :is="comp[modalName]"
            v-bind="{ confirmStatusHandler, pickText, options: otherOptions }"
          />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
@import "@/assets/style/modal.css";
</style>
