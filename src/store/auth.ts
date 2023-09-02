export const useAuth = defineStore("auth", {
  state: () => ({
    user: null,
    loggedIn: false,
  }),
  // getters: {},
  actions: {
    setUserDataWhenLoggedIn(payload: any) {
      this.user = payload;
      this.loggedIn = true;
    },
  },
  hydrate(state, initialState) {
    state.loggedIn = useLocalStorage("loggedIn", false) as any;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
