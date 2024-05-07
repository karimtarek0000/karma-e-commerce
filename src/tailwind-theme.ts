const shared = {
  label: "text-md font-medium text-black",
  input:
    "w-full mt-1 text-sm bg-white rounded-md shadow-sm focus:border-secondary border-secondary",
  message: "text-red-800 font-bold mt-[5px] text-14",
};

export default {
  "family:text": {
    label: shared.label,
    input: shared.input,
    message: shared.message,
  },
  textarea: {
    input: "w-full resize-none rounded-md",
    label: shared.label,
  },
  checkbox: {
    wrapper: "flex gap-2",
    input:
      "w-5 h-5 bg-white border-gray-800 rounded-sm shadow-sm text-secondary",
    message: shared.message,
  },
};
