<script setup lang="ts">
import { useToast } from "vue-toastification";
const { $http } = useNuxtApp();

// --------- Data -----------
const form = reactive({
  email: "",
});
const router = useRouter();
const toast = useToast();

// --------- Define -----------
definePageMeta({
  layout: "auth",
});

// --------- Functions -----------
const submitHandler = async ({ email }: { email: string }) => {
  const { data, error, pending } = await useLazyAsyncData(() =>
    $http("/auth/forget-password", {
      method: "POST",
      body: {
        email,
      },
    })
  );

  if (!error.value && !pending.value) {
    toast.success(`${data.value.message} check your email`);
    router.replace("/auth");
  }

  if (error.value) {
    toast.error(error.value.data.message);
  }
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
          class="flex items-center justify-center w-full px-12 py-3 text-sm text-white transition border rounded-md gap-x-2 hover:bg-secondary/90 bg-secondary shrink-0"
        >
          <ShareLoader v-if="loading" />
          Confirm email
        </button>
      </div>
    </template>
  </FormKit>
</template>
