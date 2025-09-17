import type { UserType } from "./UserType";

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  regular_price: number;
  group_price: number;
  image: string | null;
  category: string;
  orderd: UserType[]; ///הוזמנו ומי הזמין
  comments: [{ id: number; text: string }]; // מערך תגובות
  quantityCustomers: number;
  quantityAllCustomers: number;
};
