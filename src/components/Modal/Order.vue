<script setup lang="ts">
import { useToast } from "vue-toastification";
import { createInput } from "@formkit/vue";

// ---------- Define ---------
const props = defineProps<{
  options: OptionsPropsOrder;
  closeModalHandler: () => {};
}>();

// ---------- Composables ---------
const http = useHttp();
const toast = useToast();

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
const submitHandler = async (data: OrderModal) => {
  const { address, phoneNumber, couponCode, paymentMethod } = data;
  const body: any = {
    address,
    phoneNumber,
    paymentMethod,
  };

  // If exist coupon code
  if (couponCode) body.couponCode = couponCode;

  // For One Product
  if (props.options?.productId) {
    const { productId, quantity } = props.options;
    body.productId = productId;
    body.quantity = quantity;
  }

  // ------ API ------
  const {
    data: order,
    pending,
    error,
  } = await useAsyncData(() =>
    http(`order/${props.options?.cartId}`, {
      method: "POST",
      body,
    })
  );

  if (!pending.value && !error.value) {
    await refreshNuxtData("cart");
    toast.success(order.value.message);
  }

  if (error.value) {
    toast.error(error.value.message);
  }

  // Close modal
  props.closeModalHandler();
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
          :validation="[['required'], ['matches', /^0(11|12|10)[0-9]{8}$/]]"
          :validation-messages="{
            matches: 'Phone number must be 11 digits',
          }"
          autocomplete="off"
        />
      </div>

      <!-- Apply coupon code -->
      <div class="my-3">
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
      <div>
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

      <!-- Address -->
      <div class="mt-3">
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
