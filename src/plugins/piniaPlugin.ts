import { PiniaPluginContext } from "pinia";

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  return {};
}

export default defineNuxtPlugin(({ $pinia }: any) => {
  return $pinia.use(MyPiniaPlugin);
});
