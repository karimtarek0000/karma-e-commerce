<script setup lang="ts">
import { createInput } from "@formkit/vue";

// ---------- Components ---------
const paymentMethodMS = createInput(resolveComponent("ShareMSelect"));

// ------------- Data -------------
const form = reactive<OrderModal>({
  phoneNumber: "",
  couponCode: "",
  address: "",
  paymentMethod: "",
});
const paymentMethodSelected = ref<string>("");
const paymentMethods = ref<string[]>(["card", "cash"]);

// ------------- Functions --------------
const submitHandler = (data: OrderModal) => {
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

      <!-- Address -->
      <div>
        <FormKit
          type="textarea"
          id="address"
          name="address"
          rows="5"
          label="Enter your address"
          placeholder="Enter your address"
          validation="required"
          autocomplete="off"
        />
      </div>

      <!-- Apply coupon code -->
      <div class="mt-3">
        <FormKit
          type="text"
          id="couponCode"
          name="couponCode"
          label="Enter your coupon code (optional)"
          placeholder="Enter your coupon code"
          autocomplete="off"
        />
      </div>

      <!-- Payment method -->
      <div class="mt-3">
        <label for="paymentMethod" class="block mb-1 text-14">*Select payment method</label>
        <FormKit
          :type="paymentMethodMS"
          id="paymentMethods"
          name="paymentMethod"
          validation="required"
          :options="paymentMethods"
          :value="paymentMethodSelected"
        />
      </div>

      <!-- Actions -->
      <div class="mt-3 mb-2 text-center col-span-full">
        <button
          :disabled="loading || !valid"
          class="flex items-center justify-center w-full px-12 py-3 text-sm text-white transition border rounded-md gap-x-2 hover:bg-secondary/90 bg-secondary shrink-0"
        >
          <ShareLoader v-if="loading" />
          Checkout
        </button>
      </div>
    </template>
  </FormKit>
</template>
