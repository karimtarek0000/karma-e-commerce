<script setup lang="ts">
import { useBtnHideOrShowPassword } from "@/composables/forms";

// --------- Data -----------
const form = reactive({
  NewPassword: "",
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
      <div class="space-y-4 col-span-full">
        <!-- New Password -->
        <div class="relative">
          <FormKit
            :type="showPassword ? 'text' : 'password'"
            id="Password"
            name="NewPassword"
            placeholder="New Password"
            label="New Password"
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
        <div>
          <FormKit
            type="password"
            id="confirmPassword"
            name="NewPassword_confirm"
            label="Confirm Password"
            placeholder="Confirm Password"
            validation="required|confirm"
            autocomplete="off"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="text-center col-span-full">
        <button
          :disabled="loading || !valid"
          class="w-full px-12 py-3 text-sm text-white transition border rounded-md hover:bg-secondary/90 bg-secondary shrink-0"
        >
          {{ loading ? "Loading..." : "Reset password" }}
        </button>
      </div>
    </template>
  </FormKit>
</template>
