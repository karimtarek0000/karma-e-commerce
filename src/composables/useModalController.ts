type ModalHandler = {
  $modalType: string;
  $classes?: string;
  $pickText?: string;
};

const modalControllerRef = ref<any>("modalControllerRef");
const toggleModal = ref<boolean>(false);
const modalName = ref<string>("");
const classes = ref<string | null>();
const pickText = ref<string | null>();

const openModalHandler = ({ $modalType, $classes, $pickText }: ModalHandler): void => {
  toggleModal.value = true;
  modalName.value = $modalType;
  classes.value = $classes;
  pickText.value = $pickText;
};

export const useModalController = () => {
  return { modalControllerRef, openModalHandler, classes, modalName, toggleModal, pickText };
};
