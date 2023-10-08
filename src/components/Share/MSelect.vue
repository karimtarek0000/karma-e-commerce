<script setup lang="ts">
import VueMultiselect from "vue-multiselect";

defineProps<{
  context: {
    _value: string;
    attrs: {
      options: any[];
    };
    node: any;
  };
}>();
</script>

<template>
  <VueMultiselect
    class="border rounded-md border-secondary"
    deselect-label=""
    placeholder="Select payment method"
    selectLabel=""
    :searchable="false"
    :options="context.attrs.options"
    :modelValue="context._value"
    @update:modelValue="context.node.input($event)"
  />
</template>
