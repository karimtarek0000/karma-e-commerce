import jwt_decode from "jwt-decode";
import { AuthState, UserData } from "types";

export const useAuth = defineStore("auth", {
  state: (): AuthState => ({
    user: {} as UserData,
    loggedIn: false,
  }),
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
  actions: {
    setUserDataWhenLoggedIn(token: string) {
      const { _id, name, email, role } = jwt_decode(token) as UserData;

      this.user = { _id, name, email, role };
      this.loggedIn = true;
    },
    async logout() {
      const { $http } = useNuxtApp();
      const { error } = await useLazyAsyncData(() => $http("/auth/logout"));

      if (!error.value) {
        const accessToken = useCookie("accessToken");
        this.loggedIn = false;
        this.user = {};
        accessToken.value = null;
        navigateTo("/auth");
      }
    },
  },
  hydrate(state, initialState) {
    state.loggedIn = useLocalStorage("loggedIn", false) as any;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
