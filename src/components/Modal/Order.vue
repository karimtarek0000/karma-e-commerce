<script setup lang="ts">
import VueMultiselect from "vue-multiselect";
import { createInput } from "@formkit/vue";

// ------------- Data -----------------
const form = reactive<{
  phoneNumber: string;
  coupon: string;
}>({
  phoneNumber: "",
  coupon: "",
});
const paymentMethodSelected = ref<string>();
const paymentMethods = ref<string[]>(["card", "cash"]);

// ------------- Functions -----------------
const submitHandler = (data: { phoneNumber: string }) => {
  console.log(data);
};
</script>

<template>
  <!-- Header -->
  <header class="mb-4 text-center">
    <h1 class="mb-2 font-bold capitalize text-22">order checkout</h1>
    <p class="text-18"></p>
  </header>

  <!-- Form -->
  <FormKit
    id="order"
    type="form"
    :actions="false"
    :value="form"
    :config="{ validationVisibility: 'dirty' }"
    @submit="submitHandler"
  >
    <template #default="{ state: { valid, loading } }">
      <!-- Phonenumber -->
      <div>
        <FormKit
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          label="Add another phone number (optional)"
          placeholder="Enter your phone"
          :validation="[['matches', /^0(11|12|10)[0-9]{8}$/]]"
          :validation-messages="{
            matches: 'Phone number must be 11 digits',
          }"
          autocomplete="off"
        />
      </div>

      <!-- Apply coupon -->
      <div class="mt-3">
        <FormKit
          type="text"
          id="coupon"
          name="coupon"
          label="Enter your coupon (optional)"
          placeholder="Enter your coupon"
          autocomplete="off"
        />
      </div>

      <!-- Payment method -->
      <div class="mt-3">
        <label for="paymentMethod" class="block mb-1 text-14">Select payment method</label>
        <VueMultiselect
          v-model="paymentMethodSelected"
          id="paymentMethod"
          :options="paymentMethods"
          :searchable="false"
          deselect-label=""
          placeholder="Select payment method"
          selectLabel=""
          class="border rounded-md border-secondary"
        >
        </VueMultiselect>
      </div>

      <!-- Actions -->
      <div class="mt-3 mb-2 text-center col-span-full">
        <button
          :disabled="!valid"
          class="flex items-center justify-center w-full px-12 py-3 text-sm text-white transition border rounded-md gap-x-2 hover:bg-secondary/90 bg-secondary shrink-0"
        >
          Submit order
        </button>
      </div>
    </template>
  </FormKit>
</template>
