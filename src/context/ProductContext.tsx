// context/ProductContext.ts
import { createContext } from "react";
import { Product } from "../types/models";

// Define the shape of the context
export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

// Create context with default value of undefined
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);
