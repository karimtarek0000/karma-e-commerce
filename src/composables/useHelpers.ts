export const replaceCloudinaryURL = (text: string) => {
  const result = text.replace("https://res.cloudinary.com/dmtlew6gk/image/upload/", "");
  return result;
};

export const isProductInCart = (initialProductId: string) => {
  const { data: cart } = useNuxtData("cart");
  const productId = ref<string>(initialProductId);

  const productCartIds = computed((): string[] =>
    cart.value?.cart?.products?.map((product: CartProduct) => product?.productId?._id)
  );

  const productInCartStatus = computed(() =>
    productCartIds.value?.includes(productId.value as string)
  );

  return { productId, productInCartStatus };
};

export const showLoader = (status: string, selectedId: string, id: string) => {
  return status === "pending" && selectedId === id;
};

export const formatDate = (date: Date, lang = "ar-EG") => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(lang, options);
};
