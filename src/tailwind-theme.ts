const shared = {
  label: "text-sm font-medium text-black",
  input:
    "w-full mt-1 text-sm bg-white rounded-md shadow-sm focus:border-secondary border-secondary",
};

export default {
  "family:text": {
    label: shared.label,
    input: shared.input,
  },
  select: {
    label: shared.label,
    input: shared.input,
  },
  checkbox: {
    wrapper: "flex gap-2",
    input: "w-5 h-5 bg-white border-gray-200 rounded-md shadow-sm text-secondary",
  },
};
