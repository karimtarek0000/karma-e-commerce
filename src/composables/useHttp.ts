import type { FetchOptions, FetchRequest } from "ofetch";
import { ofetch } from "ofetch";

export const useHttp = () => {
  // -------------------------- BASE DATA --------------------------
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken");
  const headers = useRequestHeaders(["cookie"]);
  const { setUserDataWhenLoggedIn, logout } = useAuth();

  // -------------------------- CREATE --------------------------
  const fetcher = ofetch.create({
    baseURL: config.public.BASE_URL,
    headers,
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
          headers,
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
      const status = error.response?.status;
      // If refresh token expired
      if (error.response?._data.message === "TokenExpiredError: jwt expired" && status === 500) {
        return logout();
      }

      // When user unauthenticated
      if (status === 401 || status === 403) {
        const response = await fetcher.raw(request, options);
        return response._data;
      }

      return Promise.reject(error.response._data);
    }
  };
};
