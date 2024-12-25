// context/CartContext.ts
import { createContext } from "react";
import { CartContextType } from "./CartProvider";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
