export type UserData = {
  _id?: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "SuperAdmin";
};

export type UserDataSignUp = UserData & {
  password: string;
  phoneNumber: string;
};

export type Gategory = {
  _id: string;
  image: { secure_url: string };
  name: string;
  slug: string;
  subCategories: Gategory[];
};

export type Product = {
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
  categoryId: string;
  subCategoryId: string;
  brandId: string;
};

export type AuthState = {
  user: UserData;
  loggedIn: boolean;
};
