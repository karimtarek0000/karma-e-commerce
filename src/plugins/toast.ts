import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  // Prevent all previous toasts
  const filterBeforeCreate = (toast: any, toasts: any) => (toasts.length ? toasts[0] : toast);

  // Implementations
  nuxtApp.vueApp.use(Toast, {
    timeout: 3000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: true,
    closeButton: "button",
    newestOnTop: true,
    filterBeforeCreate,
  });
});
