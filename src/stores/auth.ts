import jwt_decode from "jwt-decode";
import { useToast } from "vue-toastification";

export const useAuth = defineStore("auth", {
  state: (): AuthState => ({
    user: {} as UserData,
    loggedIn: false,
    dataURL: "",
    addInCart: false,
  }),
  getters: {
    isLoggedIn(state) {
      return !!(state.loggedIn && state.user.email);
    },
    addInCartStatus(state) {
      return state.addInCart;
    },
  },
  actions: {
    setUserDataWhenLoggedIn(token: string) {
      const { _id, name, email, role } = jwt_decode(token) as UserData;

      this.user = { _id, name, email, role };
      this.loggedIn = true;
    },
    changeAddInCartStatus(status: boolean) {
      this.addInCart = status;
    },
    async logout() {
      const http = useHttp();
      const toast = useToast();

      const { error, pending } = await useLazyAsyncData(() => http("/auth/logout"));

      if (!error.value && !pending.value) {
        const accessToken = useCookie("accessToken");
        this.loggedIn = false;
        this.user = {} as any;
        accessToken.value = null;
        toast.success("Logout successfully");
        await refreshNuxtData("cart");
        navigateTo("/auth");
      }

      if (error.value) {
        toast.error(error.value.message);
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
