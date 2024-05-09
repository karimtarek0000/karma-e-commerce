export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie("accessToken");
  const { setUserDataWhenLoggedIn } = useAuth();
  console.log("Middleware");

  if (accessToken.value) {
    setUserDataWhenLoggedIn(accessToken?.value as string);
  }

  if (accessToken.value && to.path.includes("/auth")) {
    return navigateTo("/");
  }

  // ------- Guards ---------
  const paths = ["/cart", "/payment", "/order-info", "/orders"];

  if (!accessToken.value && paths.some((p) => to.path.includes(p))) {
    return navigateTo("/auth");
  }
});
