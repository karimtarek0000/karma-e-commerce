export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "SuperAdmin";
};
