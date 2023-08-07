export const useProducts = defineStore("products", {
  state: () => {
    return {
      name: "apple",
    };
  },
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
