<script setup lang="ts">
const form = reactive({
  name: "",
  email: "",
  phone: "",
  clientType: "",
  password: "",
  confirmPassword: "",
});

definePageMeta({
  layout: "auth",
});

const submitHandler = async (data: any) => {
  console.log("Submit", data);
};
</script>

<template>
  <FormKit
    type="form"
    form-class="grid grid-cols-8 gap-6 px-2 mt-8 overflow-hidden md:grid-cols-6"
    :actions="false"
    :value="form"
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
        <FormKit
          type="email"
          id="Email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          autocomplete="off"
        />
      </div>

      <!-- Phone -->
      <div class="col-span-full md:col-span-6">
        <FormKit
          type="text"
          id="Phone"
          label="Phone"
          name="phone"
          placeholder="Enter your phone"
          autocomplete="off"
        />
      </div>

      <!-- Saler or Payer -->
      <div class="col-span-full">
        <FormKit
          type="select"
          label="Select client type"
          name="clientType"
          :options="['Saler', 'Payer']"
        />
      </div>

      <!-- Password and confirm password -->
      <FormKit type="group">
        <!-- Password -->
        <div class="col-span-full md:col-span-3">
          <FormKit
            type="password"
            id="Password"
            name="password"
            placeholder="Password"
            label="Password"
            autocomplete="off"
          />
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
      </FormKit>

      <!-- Terms and condition -->
      <div class="flex col-span-6">
        <FormKit
          type="checkbox"
          label="Agree terms and conditions"
          name="terms"
          :value="false"
          validation="accepted"
          validation-visibility="dirty"
        />
      </div>

      <!-- Actions -->
      <div class="text-center col-span-full">
        <button
          :disabled="loading || !valid"
          class="w-full px-12 py-3 text-sm text-white transition border rounded-md hover:bg-secondary/90 bg-secondary shrink-0"
        >
          {{ loading ? "Loading..." : "Create an account" }}
        </button>

        <p class="mt-4 text-sm text-gray-500">
          Already have an account?
          <a href="#" class="text-gray-700 underline">Log in</a>.
        </p>
      </div>
    </template>
  </FormKit>
</template>

<style lang="scss" scoped></style>
