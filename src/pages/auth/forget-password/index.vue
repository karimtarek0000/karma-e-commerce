<script setup lang="ts">
// --------- Data -----------
const form = reactive({
  email: "",
});

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

      <!-- Actions -->
      <div class="text-center col-span-full">
        <button
          :disabled="loading || !valid"
          class="w-full px-12 py-3 text-sm text-white transition border rounded-md hover:bg-secondary/90 bg-secondary shrink-0"
        >
          {{ loading ? "Loading..." : "Confirm email" }}
        </button>
      </div>
    </template>
  </FormKit>
</template>
