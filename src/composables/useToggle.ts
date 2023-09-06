export const useToggle = (status?: boolean) => {
  const itemStatus = ref<boolean>(status || false);

  const toggleItemHandler = (): boolean => (itemStatus.value = !itemStatus.value);

  return {
    toggleItemHandler,
    itemStatus,
  };
};
