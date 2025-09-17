// src/context/UserContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserRegister } from "../logic/UserType";

export type Order = {
  id: string;
  productName: string;
  date: string;
  status: string;
  total: number;
};

export type Group = {
  id: string;
  name: string;
};

export type UserFull = UserRegister & {
  orders: Order[]; // הזמנות
  groups: Group[]; // קבוצות רכישה
};

type UserContextType = {
  user: UserFull | null;
  setUser: (user: UserFull) => void;
  addOrder: (order: Order) => void;
  joinGroup: (group: Group) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserFull | null>(null);

  const addOrder = (order: Order) => {
    if (user) setUser({ ...user, orders: [...user.orders, order] });
  };

  const joinGroup = (group: Group) => {
    if (user) setUser({ ...user, groups: [...user.groups, group] });
  };

  return (
    <UserContext.Provider value={{ user, setUser, addOrder, joinGroup }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
