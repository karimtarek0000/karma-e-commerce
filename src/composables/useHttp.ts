import type { FetchRequest, FetchOptions } from "ofetch";
import { ofetch } from "ofetch";

export const useHttp = () => {
  // -------------------------- BASE DATA --------------------------
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken");
  const { setUserDataWhenLoggedIn, logout } = useAuth();

  // -------------------------- CREATE --------------------------
  const fetcher = ofetch.create({
    baseURL: config.public.BASE_URL,
    credentials: "include",

    // -------------------------- REQUEST --------------------------
    async onRequest({ options }) {
      if (accessToken.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken.value}`,
        };
      }
    },

    // -------------------------- RESPONSE --------------------------
    async onResponse({ response }) {
      const res = response._data;

      // ----- When user logged in will set token and userData ------
      if (res?.message === "Login successfully") {
        accessToken.value = res?.user?.accessToken;
        setUserDataWhenLoggedIn(accessToken.value as string);
      }

      // -------- If response error status code `401` || `403` will get new token --------
      if (response.status === 401 || response.status === 403) {
        const refreshToken = await ofetch("/auth/refresh-token", {
          baseURL: config.public.BASE_URL,
          method: "GET",
          credentials: "include",
        });

        accessToken.value = refreshToken.accessToken;
      }
    },
  });

  // -------- Finally will use this function ----------
  return async (request: FetchRequest, options?: FetchOptions) => {
    try {
      const response = await fetcher.raw(request, options);
      return response._data;
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        const response = await fetcher.raw(request, options);
        return response._data;
      }
      return error.response;
    }
  };
};
