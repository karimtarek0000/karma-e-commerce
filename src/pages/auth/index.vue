<script setup lang="ts">
import { reset } from "@formkit/core";
import { useBtnHideOrShowPassword } from "@/composables/forms";
import { useOneTap, type CredentialResponse } from "vue3-google-signin";
import { useToast } from "vue-toastification";
const { $http } = useNuxtApp();

// --------- Data -----------
const form = reactive({
  email: "",
  password: "",
});
const { showPasswordToggle, showPassword } = useBtnHideOrShowPassword();
const router = useRouter();
const toast = useToast();

// --------- Define -----------
definePageMeta({
  layout: "auth",
});

// --------- Functions -----------
// Login with email
const submitHandler = async (userData: { email: string; password: string }): Promise<void> => {
  const { error, pending } = await useLazyAsyncData(() => $http("/auth/sign-in", { method: "POST", body: userData }));

  if (!error.value && !pending.value) {
    reset("signInForm");
    toast.success("Login successfully");
    router.replace("/");
  }

  if (error.value) {
    toast.error(error.value.data.message);
  }
};

// Login with Google
const successSignInGoogle = async (response: CredentialResponse): Promise<void> => {
  const { error, pending } = await useLazyAsyncData(() =>
    $http("/auth/login-with-google", { method: "POST", body: { idToken: response.credential } })
  );

  if (!error.value && !pending.value) {
    toast.success("Login with google successfully");
    router.replace("/");
  }

  if (error.value) {
    toast.error(error.value.data.message);
  }
};

const { isReady, login } = useOneTap({
  disableAutomaticPrompt: true,
  onSuccess: successSignInGoogle,
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
        <FormKit type="email" id="Email" name="email" label="Email" placeholder="Enter your email" validation="required|email" autocomplete="off" />
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
        <button @click="showPasswordToggle" type="button" class="absolute top-[34px] end-2">
          <ShareRenderSVG :iconName="showPassword ? 'visible-password' : 'un-password'" />
        </button>
      </div>

      <!-- Actions -->
      <div class="text-center col-span-full">
        <div class="flex justify-end mb-4">
          <NuxtLink to="/auth/forget-password" class="text-gray-700 underline text-end">forget password?</NuxtLink>
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
          <NuxtLink to="/auth/sign-up" class="text-gray-700 underline">Create new account</NuxtLink>
        </p>
        <hr />
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
