export const useDebounce = () => {
  let debounce: any = null;

  return (fn: Function, delay: number = 3000) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      fn();
    }, delay);
  };
};
