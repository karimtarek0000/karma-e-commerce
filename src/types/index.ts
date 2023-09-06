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

export type AuthState = {
  user: UserData;
  loggedIn: boolean;
};
