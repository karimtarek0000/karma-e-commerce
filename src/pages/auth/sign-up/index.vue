<script setup lang="ts">
import { reset } from "@formkit/core";
import { useToast } from "vue-toastification";
import { useBtnHideOrShowPassword } from "@/composables/forms";
import { UserDataSignUp } from "types";
const { $http } = useNuxtApp();

// --------- Data -----------
const form = reactive<UserDataSignUp>({
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "User",
});
const router = useRouter();
const toast = useToast();
const { showPasswordToggle, showPassword } = useBtnHideOrShowPassword();

// --------- Define -----------
definePageMeta({
  layout: "auth",
});

// --------- Functions -----------
const submitHandler = async (userDataForm: UserDataSignUp): Promise<void> => {
  const { name, email, phoneNumber, password, role } = userDataForm;
  const userData = { name, email, phoneNumber, password, role };

  const { data, error, pending } = await useLazyAsyncData(() =>
    $http("/auth", {
      method: "POST",
      body: userData,
    })
  );

  if (!error.value && !pending.value) {
    reset("sign-up-form");
    toast.success(data.value.message);
    router.replace("/auth");
  }

  if (error.value) {
    toast.error(error.value.data.message);
  }
};
</script>

<template>
  <FormKit
    id="sign-up-form"
    type="form"
    form-class="grid grid-cols-8 gap-6 px-2 mt-8 overflow-hidden md:grid-cols-[repeat(6,minmax(0,60px))]"
    :actions="false"
    :value="form"
    :config="{ validationVisibility: 'dirty' }"
    @submit="submitHandler"
  >
    <template #default="{ state: { valid, loading } }">
      <!-- Name -->
      <div class="mb-1 col-span-full">
        <FormKit
          type="text"
          id="name"
          name="name"
          label="Name"
          validation="required|contains_alpha|length:4,10"
          placeholder="Enter your name"
          autofocus="true"
          autocomplete="off"
        />
      </div>

      <!-- Email -->
      <div class="col-span-full md:col-span-6">
        <FormKit type="email" id="Email" name="email" label="Email" placeholder="Enter your email" validation="required|email" autocomplete="off" />
      </div>

      <!-- Phonenumber -->
      <div class="col-span-full md:col-span-6">
        <FormKit
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter your phone"
          :validation="[['required'], ['matches', /^0(11|12|10)[0-9]{8}$/]]"
          :validation-messages="{
            matches: 'Phone number must be 11 digits',
          }"
          autocomplete="off"
        />
      </div>

      <!-- Password -->
      <div class="relative col-span-full md:col-span-3">
        <FormKit
          :type="showPassword ? 'text' : 'password'"
          id="Password"
          name="password"
          placeholder="Password"
          label="Password"
          autocomplete="off"
          :validation="[['required'], ['matches', /(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*[0-9]{3,})(?=.*[@$%#]{1,})[a-zA-Z\d@$%#]{8,}/]]"
          :validation-messages="{
            matches: 'You must enter password like: kaKA@#123',
          }"
        />

        <!-- To show or hide password -->
        <button @click="showPasswordToggle" type="button" class="absolute top-[34px] end-2">
          <ShareRenderSVG :iconName="showPassword ? 'visible-password' : 'un-password'" />
        </button>
      </div>

      <!-- Confirm password -->
      <div class="col-span-full md:col-span-3">
        <FormKit
          type="password"
          id="confirmPassword"
          name="password_confirm"
          label="Confirm Password"
          placeholder="Confirm Password"
          validation="required|confirm"
          autocomplete="off"
        />
      </div>

      <!-- Terms and condition -->
      <div class="flex col-span-6">
        <FormKit type="checkbox" label="Agree terms and conditions" name="terms" :value="false" validation="accepted" validation-visibility="dirty" />
      </div>

      <!-- Actions -->
      <div class="text-center col-span-full">
        <button
          :disabled="loading || !valid"
          class="flex items-center justify-center w-full px-12 py-3 text-sm text-white transition border rounded-md gap-x-2 hover:bg-secondary/90 bg-secondary shrink-0"
        >
          <ShareLoader v-if="loading" />
          Create an account
        </button>

        <p class="mt-4 text-sm text-gray-500">
          Already have an account?
          <NuxtLink to="/auth" class="text-gray-700 underline">Log in</NuxtLink>
        </p>
      </div>
    </template>
  </FormKit>
</template>
