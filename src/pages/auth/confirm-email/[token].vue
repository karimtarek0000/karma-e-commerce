<script setup lang="ts">
import { useToast } from "vue-toastification";

// ----------- Composables -----------
const {
  params: { token },
} = useRoute();
const http = useHttp();
const toast = useToast();

// ----------- API -----------
const {
  data,
  error,
  pending: loader,
  execute,
} = await useLazyAsyncData(() => http(CONFIRM_EMAIL(token as string)), {
  immediate: false,
});
loader.value = false;

// --------- functions -----------
const sendConfirm = async () => {
  await execute();

  if (!loader.value && !error.value) {
    toast.success(data.value.message);
    navigateTo("/auth");
  }

  if (error.value) {
    toast.error(error.value.message);
  }
};

// ----------- Meta ------------
useSeoMeta({
  title: "Auth - confirm email",
});

// --------- Define -----------
definePageMeta({
  layout: "auth",
  validate: async ({ params }) => {
    return params.token.length > 20;
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-5 mt-20">
    <p>Valid for only 30 minutes</p>
    <button
      @click="sendConfirm"
      class="flex items-center gap-4 px-4 py-2 text-white rounded-md bg-secondary"
    >
      <ShareLoader v-if="loader" />
      Verify email
    </button>
  </div>
</template>
