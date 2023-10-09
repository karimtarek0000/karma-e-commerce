declare global {
  type UserData = {
    _id?: string;
    name: string;
    email: string;
    role: "User" | "Admin" | "SuperAdmin";
  };
  type UserDataSignUp = UserData & {
    password: string;
    phoneNumber: string;
  };
  type Gategory = {
    _id: string;
    image: { secure_url: string };
    name: string;
    slug: string;
    subCategories: SubGategory[];
  };
  type SubGategory = {
    _id: string;
    image: { secure_url: string };
    name: string;
    slug: string;
    brands: SubGategory[];
  };
  type Brand = {
    _id: string;
    image: { secure_url: string };
    name: string;
    slug: string;
  };
  type Product = {
    _id: string;
    title: string;
    description: string;
    slug: string;
    price: number;
    discount: number;
    priceAfterDiscount: number;
    stock: number;
    colors: string[];
    sizes: string[];
    images: [
      {
        public_id: string;
        secure_url: string;
      }
    ];
    reviewRatings: number;
    categoryId: string;
    subCategoryId: string;
    brandId: string;
  };
  type AuthState = {
    user: UserData;
    loggedIn: boolean;
    dataURL: string;
  };
  type Cart = {
    _id: string;
    userId: string;
    products: { productId: Product; quantity: number }[];
    subTotal: number;
  };
  type CartProduct = {
    productId: Product;
    quantity: number;
  };
  type Order = {
    _id: string;
    products: Product[];
    subTotal: number;
    paidAmount: number;
    address: string;
    phoneNumbers: string[];
  };
  type OrderModal = {
    phoneNumber: string;
    couponCode: string;
    address: string;
    paymentMethod: "card" | "cash" | "";
  };
  type OptionsPropsOrder = {
    cartId?: string;
    productId?: string;
    quantity?: number;
  };
}

export {};
