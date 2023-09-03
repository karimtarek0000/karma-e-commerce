import { useAuth } from "@/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie("accessToken");
  const { setUserDataWhenLoggedIn } = useAuth();

  if (accessToken.value) {
    setUserDataWhenLoggedIn(accessToken?.value as string);
  }

  if (accessToken.value && to.path.includes("/auth")) {
    return navigateTo("/");
  }
});
