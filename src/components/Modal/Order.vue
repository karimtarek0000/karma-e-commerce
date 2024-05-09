<script setup lang="ts">
import { createInput } from "@formkit/vue";
import { useToast } from "vue-toastification";

// ---------- Define ---------
const { options, closeModalHandler } = defineProps<{
  options: OptionsPropsOrder;
  closeModalHandler: () => {};
}>();

// ---------- Composables ---------
const http = useHttp();
const toast = useToast();
const debounce = useDebounce();

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
const couponCode = ref<string>();

// ------------- API --------------
const {
  data: coupon,
  pending: couponCheckLoading,
  error,
  execute: couponCheckExecute,
} = await useAsyncData(
  "couponCheck",
  () =>
    http(COPOUN_CHECK, {
      method: "POST",
      body: {
        couponCode: couponCode.value,
      },
    }),
  {
    immediate: false,
  }
);
couponCheckLoading.value = false;

// ------------- Functions --------------
const couponCodeCheckHandler = (value: any): void => {
  if (value) {
    return debounce(async () => {
      couponCode.value = value;
      await couponCheckExecute();
    }, 1000);
  }
  clearNuxtData("couponCheck");
};

const submitHandler = async (data: OrderModal) => {
  const { address, phoneNumber, couponCode, paymentMethod } = data;
  const body: any = {
    address,
    phoneNumber,
    paymentMethod,
  };

  // If coupon code exist
  if (couponCode) body.couponCode = couponCode;

  // For One Product
  if (options?.productId) {
    const { productId, quantity } = options;
    body.productId = productId;
    body.quantity = quantity;
  }

  // ------ API ------
  const {
    data: order,
    pending,
    error,
  } = await useAsyncData("orderInfo", () =>
    http(GET_ORDER(options?.cartId ?? ""), {
      method: "POST",
      body,
    })
  );

  if (!pending.value && !error.value) {
    !options?.productId && (await refreshNuxtData("cartShopping"));

    if (!order.value?.checkOutURL) {
      await navigateTo(`/order-info/${order.value.order._id}`);
      toast.success(order.value.message);
    } else {
      open(order.value?.checkOutURL);
    }

    // Close modal
    closeModalHandler();
  }

  if (error.value) {
    toast.error(error.value.message);
  }
};

// ------------- Life cycle --------------
onUnmounted(() => clearNuxtData("couponCheck"));
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
          label="*Add another phone number"
          placeholder="Enter your phone"
          :validation="[['required'], ['matches', /^0(11|12|10)[0-9]{8}$/]]"
          :validation-messages="{
            matches: 'Phone number must be 11 digits',
          }"
          autocomplete="off"
        />
      </div>

      <!-- Apply coupon code -->
      <div class="relative my-3">
        <FormKit
          type="text"
          id="couponCode"
          name="couponCode"
          label="Enter your coupon code"
          placeholder="Enter your coupon code"
          autocomplete="off"
          @input="couponCodeCheckHandler"
        />
        <!-- Loading -->
        <div class="absolute bottom-2 end-2">
          <ShareLoader v-if="couponCheckLoading" class="!border-t-secondary" />
        </div>
      </div>
      <!-- Error -->
      <p class="mb-2 text-red-800 text-14" v-if="error">{{ error.message }}</p>
      <!-- Show coupon result -->
      <p v-if="coupon" class="mb-2 text-14 text-secondary">
        This coupon will do off
        <span class="font-bold">{{ coupon?.coupon?.couponAmount }}</span>
        {{ coupon?.coupon?.couponAmountType === "fixed" ? "EGP" : "%" }} from
        total amount
      </p>

      <!-- Payment method -->
      <div>
        <label for="paymentMethod" class="block mb-1 text-md"
          >*Select payment method</label
        >
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
          label="*Enter your address"
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
