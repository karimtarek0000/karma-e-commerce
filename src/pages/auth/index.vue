<script setup lang="ts">
import { useBtnHideOrShowPassword } from "@/composables/forms";
const { $http } = useNuxtApp();

// --------- Data -----------
const form = reactive({
  email: "",
  password: "",
});
const { showPasswordToggle, showPassword } = useBtnHideOrShowPassword();
const router = useRouter();

// --------- Define -----------
definePageMeta({
  layout: "auth",
});

// --------- Functions -----------
const submitHandler = async (userData: { email: string; password: string }): Promise<void> => {
  const { error } = await useLazyAsyncData(() => $http("/auth/sign-in", { method: "POST", body: userData }));
  if (!error.value) {
    router.replace("/");
  }
};
</script>

<template>
  <FormKit
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

        <p class="mt-4 text-sm text-gray-500">
          Not have an account?
          <NuxtLink to="/auth/sign-up" class="text-gray-700 underline">Create new account</NuxtLink>
        </p>
      </div>
    </template>
  </FormKit>
</template>
