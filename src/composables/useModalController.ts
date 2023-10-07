const modalControllerRef = ref<any>("modalControllerRef");
const toggleModal = ref<boolean>(false);
const modalName = ref<string>("");

export const useModalController = () => {
  const openModalHandler = (_modalName: string): void => {
    toggleModal.value = true;
    modalName.value = _modalName;
  };

  return { modalControllerRef, toggleModal, modalName, openModalHandler };
};
