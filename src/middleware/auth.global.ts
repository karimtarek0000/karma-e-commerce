import { useAuth } from "@/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  //const auth = useAuth();
  // const { $http } = useNuxtApp();

  // const { data } = await useLazyAsyncData(() => $http("/auth/refresh-token"));
  // const { data, error } = await useLazyAsyncData(() => $http("/auth/refresh-token", { credentials: "include" }));
  // try {
  //   const { data, error } = await useFetch("http://localhost:3000/auth/refresh-token");
  //   console.log(data, error);
  // } catch (error) {}

  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  // if (to.path !== '/') {
  //   return navigateTo('/')
  // }

  // return navigateTo("/");
  return true;
});
