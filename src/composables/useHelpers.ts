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
