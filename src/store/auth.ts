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
    logout() {
      this.loggedIn = false;
      this.user = {};
    },
  },
  hydrate(state, initialState) {
    state.loggedIn = useLocalStorage("loggedIn", false) as any;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
