<script setup lang="ts">
import { reset } from "@formkit/core";
import { useBtnHideOrShowPassword } from "@/composables/forms";
import { useOneTap, type CredentialResponse } from "vue3-google-signin";
import { useToast } from "vue-toastification";

// --------- Composables -----------
const http = useHttp();
const { dataURL } = useAuth();
const router = useRouter();
const toast = useToast();
const { showPasswordToggle, showPassword } = useBtnHideOrShowPassword();

// --------- Data -----------
const form = reactive({
  email: "",
  password: "",
});
const url = dataURL !== "" ? dataURL : "/";

// --------- Functions -----------
// Login with email
const submitHandler = async (userData: {
  email: string;
  password: string;
}): Promise<void> => {
  const { error, pending } = await useLazyAsyncData(() =>
    http(SIGN_IN, { method: "POST", body: userData })
  );
  if (!error.value && !pending.value) {
    reset("signInForm");
    toast.success("Login successfully");
    router.replace(url);
  }
  if (error.value) {
    toast.error(error.value.message);
  }
};

// Login with Google
const successSignInGoogle = async (
  response: CredentialResponse
): Promise<void> => {
  const { error, pending } = await useLazyAsyncData(() =>
    http("/auth/login-with-google", {
      method: "POST",
      body: { idToken: response.credential },
    })
  );

  if (!error.value && !pending.value) {
    toast.success("Login with google successfully");
    router.replace(url);
  }

  if (error.value) {
    toast.error(error.value.data.message);
  }
};
const { isReady, login } = useOneTap({
  disableAutomaticPrompt: true,
  onSuccess: successSignInGoogle,
});

// --------- Define -----------
definePageMeta({
  layout: "auth",
});

// ----------- Meta ------------
useSeoMeta({
  title: "Auth - Sign in",
});
</script>

<template>
  <FormKit
    id="signInForm"
    type="form"
    form-class="grid grid-cols-8 gap-6 px-2 mt-8 overflow-hidden md:grid-cols-[repeat(6,minmax(0,60px))]"
    :actions="false"
    :value="form"
    :config="{ validationVisibility: 'dirty' }"
    @submit="submitHandler"
  >
    <template #default="{ state: { valid, loading } }">
      <!-- Email -->
      <div class="col-span-full md:col-span-6">
        <FormKit
          type="email"
          id="Email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          validation="required|email"
          autocomplete="off"
        />
      </div>

      <!-- Password -->
      <div class="relative col-span-full">
        <FormKit
          :type="showPassword ? 'text' : 'password'"
          id="Password"
          name="password"
          placeholder="Password"
          label="Password"
          autocomplete="off"
          validation="required"
        />

        <!-- To show or hide password -->
        <button
          @click="showPasswordToggle"
          type="button"
          class="absolute top-[34px] end-2"
        >
          <ShareRenderSVG
            :iconName="showPassword ? 'visible-password' : 'un-password'"
          />
        </button>
      </div>

      <!-- Actions -->
      <div class="text-center col-span-full">
        <div class="flex justify-end mb-4">
          <NuxtLink
            to="/auth/forget-password"
            class="text-gray-700 underline text-end"
            >forget password?</NuxtLink
          >
        </div>

        <button
          :disabled="loading || !valid"
          class="flex items-center justify-center w-full px-12 py-3 text-sm text-white transition border rounded-md gap-x-2 hover:bg-secondary/90 bg-secondary shrink-0"
        >
          <ShareLoader v-if="loading" />
          Login
        </button>
        <p class="my-4 text-sm text-gray-500">
          Not have an account?
          <NuxtLink to="/auth/sign-up" class="text-gray-700 underline"
            >Create new account</NuxtLink
          >
        </p>
        <div class="relative my-8">
          <hr />
          <span
            class="absolute px-2 py-1 bg-white text-secondary -translate-x-2/4 -translate-y-2/4 top-2/4 start-2/4"
            >Or</span
          >
        </div>
        <button
          type="button"
          :disabled="!isReady"
          @click="login"
          class="flex items-center justify-center w-full px-12 py-3 mt-4 text-sm transition border rounded-md gap-x-2 text-secondary shrink-0"
        >
          <ShareRenderSVG iconName="google" sizes="w-[18px]" />
          Sign in with Google
        </button>
      </div>
    </template>
  </FormKit>
</template>
