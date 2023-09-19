import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    timeout: 5000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: true,
    closeButton: "button",
  });
});
