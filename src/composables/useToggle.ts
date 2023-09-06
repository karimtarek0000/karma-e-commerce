export const useToggle = () => {
  const itemStatus = ref<boolean>(false);

  const toggleItemHandler = (): boolean => (itemStatus.value = !itemStatus.value);

  return {
    toggleItemHandler,
    itemStatus,
  };
};
