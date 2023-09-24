import { FetchContext, Headers, ofetch } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const accessToken = useCookie("accessToken");
  const { setUserDataWhenLoggedIn, logout } = useAuth();

  const apiFetcher = ofetch.create({
    baseURL: nuxtApp.$config.public.BASE_URL,
    credentials: "include",
    retry: 1,

    onRequest(ctx: FetchContext): Promise<void> | void {
      ctx.options.headers = new Headers({
        Authorization: `Bearer ${accessToken.value}`,
      });
    },

    async onResponse({ response }) {
      const res = response._data;
      if (res?.message === "Login successfully") {
        accessToken.value = res?.user?.accessToken;
        setUserDataWhenLoggedIn(accessToken.value as string);
      }
    },

    async onResponseError({ request, response, options }): Promise<any> {
      if (response.status === 401 || response.status === 403) {
        try {
          const data = await apiFetcher("/auth/refresh-token");
          accessToken.value = data.accessToken;

          const res = await apiFetcher(request, options);

          response = res;

          return response;
        } catch (error) {
          logout();
        }
      }
    },
  });

  return {
    provide: {
      http: apiFetcher,
    },
  };
});
