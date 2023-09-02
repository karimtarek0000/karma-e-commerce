import { UseFetchOptions } from "#app";
import { KeysOf, PickFrom } from "nuxt/dist/app/composables/asyncData";

type Fetch<T> = {
  data: Ref<PickFrom<T, KeysOf<T>> | null>;
  pending: Ref<boolean>;
  error: Ref<any | null>;
  execute: () => void;
};

export const useAPI = async <T>(url: string, params?: UseFetchOptions<T>): Promise<Fetch<T>> => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  const opts: UseFetchOptions<T> = {
    key: url,
    baseURL: config.public.BASE_URL,
    ...params,

    // ------------- Inetrceptors ---------------
    async onRequest({ options }: any) {
      options.headers = options.headers || {};
      if (token.value) {
        options.headers["Authorization"] = token.value;
      }
    },
    async onRequestError({ error }) {
      //   console.log(error.message);
    },
    async onResponse({ response }) {
      const res = response._data;
      if (res?.message === "Login successfully") {
        token.value = res?.user?.accessToken;
      }
    },
    async onResponseError({ response }) {
      //   console.log(response._data.message);
    },
  };

  const { data, pending, error, execute }: Fetch<T> = await useLazyFetch(url, opts);

  return {
    data,
    pending,
    error,
    execute,
  } as Fetch<T>;
};
