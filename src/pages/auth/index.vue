<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <form class="grid grid-cols-6 gap-6 mt-8">
    <!-- Name -->
    <div class="col-span-full">
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>

      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        autofocus="true"
        autocomplete="off"
        class="w-full mt-1 text-sm bg-white rounded-md shadow-sm focus:border-secondary border-secondary"
      />
    </div>

    <!-- Email -->
    <div class="col-span-6">
      <label for="Email" class="block text-sm font-medium text-gray-700">Email</label>

      <input
        type="email"
        id="Email"
        name="email"
        placeholder="Enter your email"
        autocomplete="off"
        class="w-full mt-1 text-sm text-gray-700 bg-white rounded-md shadow-sm focus:border-secondary border-secondary"
      />
    </div>

    <!-- Phone -->
    <div class="col-span-6">
      <label for="Phone" class="block text-sm font-medium text-gray-700">Phone</label>

      <input
        type="text"
        id="Phone"
        name="phone"
        placeholder="Enter your phone"
        autocomplete="off"
        class="w-full mt-1 text-sm text-gray-700 bg-white rounded-md shadow-sm focus:border-secondary border-secondary"
      />
    </div>

    <!-- Saler or Payer -->
    <select class="rounded-md lg:col-span-full sm:col-span-3 form-select">
      <option value="saler">Saler</option>
      <option selected value="payer">Payer</option>
    </select>

    <!-- Password -->
    <div class="col-span-6 sm:col-span-3">
      <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>

      <input
        type="password"
        id="Password"
        name="password"
        placeholder="Password"
        autocomplete="off"
        class="w-full mt-1 text-sm text-gray-700 bg-white rounded-md shadow-sm focus:border-secondary border-secondary"
      />
    </div>

    <!-- Confirm password -->
    <div class="col-span-6 sm:col-span-3">
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
        Password Confirmation
      </label>

      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        autocomplete="off"
        class="w-full mt-1 text-sm text-gray-700 bg-white rounded-md shadow-sm focus:border-secondary border-secondary"
      />
    </div>

    <!-- Terms and condition -->
    <div class="col-span-6">
      <label for="termsAndCondition" class="flex gap-4">
        <input
          type="checkbox"
          id="termsAndCondition"
          name="termsAndCondition"
          class="w-5 h-5 bg-white border-gray-200 rounded-md shadow-sm text-secondary"
        />

        <span class="text-sm text-gray-700"> Agree terms and conditions </span>
      </label>
    </div>

    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
      <button
        class="inline-block px-12 py-3 text-sm text-white transition border rounded-md hover:bg-secondary/90 bg-secondary shrink-0"
      >
        Create an account
      </button>

      <p class="mt-4 text-sm text-gray-500 sm:mt-0">
        Already have an account?
        <a href="#" class="text-gray-700 underline">Log in</a>.
      </p>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
