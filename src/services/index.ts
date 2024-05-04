export const SLIDER = "/home/slider";
export const TOP_RATINGS = (size: number = 8) =>
  `/products?reviewRatings[gte]=4&size=${size}`;
export const CATEGORIES = "/categories";
export const PRODUCTS = "/products";
export const PRODUCT_ID = (id: string) => `${PRODUCTS}/${id}`;
export const ORDER = "/order";
export const PAYMENT_ORDER = (status: string, token: string) =>
  `/order/${status}Order?token=${token}`;
export const ORDER_INFO = (id: string) => `/order-info/${id}`;

// ============ AUTH ============ //
export const AUTH = "/auth";
export const CONFIRM_EMAIL = (token: string) => `${AUTH}/confirm/${token}`;
export const FORGET_PASSWORD = `${AUTH}/forget-password`;
export const RESET_PASSWORD = (token: string) =>
  `${AUTH}/reset-password/${token}`;
export const SIGN_IN = `${AUTH}/sign-in`;
