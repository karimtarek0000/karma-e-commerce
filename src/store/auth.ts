import jwt_decode from "jwt-decode";
import { UserData } from "types";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    loggedIn: false,
  }),
  // getters: {},
  actions: {
    setUserDataWhenLoggedIn(token: string) {
      const { _id, name, email, role } = jwt_decode(token) as UserData;

      this.user = { _id, name, email, role };
      this.loggedIn = true;
    },
    async logout() {
      const { $http } = useNuxtApp();
      try {
        await useLazyAsyncData(() => $http("/auth/logout"));
        const accessToken = useCookie("accessToken");
        this.loggedIn = false;
        this.user = {};
        accessToken.value = null;
        navigateTo("/auth");
      } catch (error) {}
    },
  },
  hydrate(state, initialState) {
    state.loggedIn = useLocalStorage("loggedIn", false) as any;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
