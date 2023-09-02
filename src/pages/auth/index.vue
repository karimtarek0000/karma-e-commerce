<script setup lang="ts">
import { useBtnHideOrShowPassword } from "@/composables/forms";

// --------- Data -----------
const form = reactive({
  email: "",
  password: "",
});
const { showPasswordToggle, showPassword } = useBtnHideOrShowPassword();

// --------- Define -----------
definePageMeta({
  layout: "auth",
});

// --------- Functions -----------
const submitHandler = async (data: any) => {
  console.log("Submit", data);
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

      <!-- Actions -->
      <div class="text-center col-span-full">
        <button
          :disabled="loading || !valid"
          class="w-full px-12 py-3 text-sm text-white transition border rounded-md hover:bg-secondary/90 bg-secondary shrink-0"
        >
          {{ loading ? "Loading..." : "Login" }}
        </button>

        <p class="mt-4 text-sm text-gray-500">
          Not have an account?
          <NuxtLink to="/auth/sign-up" href="#" class="text-gray-700 underline">Create new account</NuxtLink>.
        </p>
      </div>
    </template>
  </FormKit>
</template>
