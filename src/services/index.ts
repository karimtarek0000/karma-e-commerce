export const SLIDER = "/home/slider";
export const CATEGORIES = "/categories";

// ============ PRODUCTS ============ //
export const PRODUCTS = "/products";
export const TOP_RATINGS = (size: number) =>
  `${PRODUCTS}?reviewRatings[gte]=4&size=${size}`;
export const PRODUCT_ID = (id: string) => `${PRODUCTS}/${id}`;

// ============ ORDER ============ //
export const ORDER = "/order";
export const PAYMENT_ORDER = (status: string, token: string) =>
  `${ORDER}/${status}Order?token=${token}`;
export const ORDER_INFO = (id: string) => `${ORDER}-info/${id}`;

// ============ CART ============ //
export const CART = "/cart";
export const DELETE_PRODUCT_FROM_CART = (id: string) => `${CART}/${id}`;

// ============ AUTH ============ //
export const AUTH = "/auth";
export const CONFIRM_EMAIL = (token: string) => `${AUTH}/confirm/${token}`;
export const FORGET_PASSWORD = `${AUTH}/forget-password`;
export const RESET_PASSWORD = (token: string) =>
  `${AUTH}/reset-password/${token}`;
export const SIGN_IN = `${AUTH}/sign-in`;
export const LOG_OUT = `${AUTH}/logout`;
