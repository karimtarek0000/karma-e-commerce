// ------------ Types -------------
type ModalHandler = {
  $modalType: string;
  $classes?: string;
  $pickText?: string;
  $otherOptions?: object;
};

// ------------ Data -------------
const toggleModal = ref<boolean>(false);
const modalName = ref<string>("");
const classes = ref<string | null>();
const pickText = ref<string | null>();
const otherOptions = ref();
const confirmStatus = ref();

// ------------------ Functions ------------------
const openModalHandler = ({
  $modalType,
  $classes,
  $pickText,
  $otherOptions,
}: ModalHandler): void => {
  toggleModal.value = true;
  modalName.value = $modalType;
  classes.value = $classes;
  pickText.value = $pickText;
  otherOptions.value = $otherOptions;
};

const confirmHandler = (): Promise<boolean> => {
  return new Promise((resolve) => (confirmStatus.value = resolve));
};

const closeModalHandler = (): void => {
  modalName.value = "";
  if (confirmStatus.value) {
    confirmStatus.value(false);
  }
};

const confirmStatusHandler = (status: boolean): void => {
  modalName.value = "";
  confirmStatus.value(status);
};

export const useModalController = () => {
  return {
    openModalHandler,
    confirmHandler,
    confirmStatusHandler,
    closeModalHandler,
    classes,
    modalName,
    toggleModal,
    pickText,
    otherOptions,
  };
};
