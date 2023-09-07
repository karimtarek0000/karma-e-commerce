import { DirectiveBinding } from "nuxt/dist/app/compat/capi";

export default defineNuxtPlugin(({ vueApp }) => {
  const scrollFn = (binding: any, el: HTMLElement) => {
    const { scrollTop, scrollHeight, clientHeight } = el;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      binding.value();
    }
  };

  vueApp.directive("scroll", {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // Add an event listener for the scroll event
      el.addEventListener("scroll", () => scrollFn(binding, el));
    },
    unmounted(el: HTMLElement, binding: DirectiveBinding) {
      // Remove the event listener when the component is unmounted
      el.removeEventListener("scroll", () => scrollFn(binding, el));
    },
  });
});
