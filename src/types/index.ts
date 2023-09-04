export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "SuperAdmin";
};

export type Gategory = {
  _id: string;
  image: string;
  name: string;
  slug: string;
  subCategories: Gategory[];
};
