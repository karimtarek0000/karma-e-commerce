import { $fetch, FetchContext, FetchOptions, Headers } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const accessToken = useCookie("accessToken");
  const { setUserDataWhenLoggedIn, logout } = useAuth();

  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.BASE_URL,
    credentials: "include",

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

          return apiFetcher(request, options);
        } catch (error) {
          logout();
        }
      }
    },
  };

  const apiFetcher = $fetch.create(fetchOptions);

  return {
    provide: {
      http: apiFetcher,
    },
  };
});
