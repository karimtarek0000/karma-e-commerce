const modalControllerRef = ref<any>("modalControllerRef");
const toggleModal = ref<boolean>(false);
const modalName = ref<string>("");
const classes = ref<string | null>();

export const useModalController = () => {
  const openModalHandler = (modelType: string, classesString?: string): void => {
    toggleModal.value = true;
    modalName.value = modelType;
    classes.value = classesString;
  };

  return { modalControllerRef, openModalHandler, classes, toggleModal, modalName };
};
