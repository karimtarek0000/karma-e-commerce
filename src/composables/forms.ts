export const useBtnHideOrShowPassword = () => {
  const showPassword = ref<boolean>(false);

  const showPasswordToggle = (): boolean => (showPassword.value = !showPassword.value);

  return { showPasswordToggle, showPassword };
};
