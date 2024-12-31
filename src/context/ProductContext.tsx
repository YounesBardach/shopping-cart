import { createContext } from "react";
import { Product } from "../types/models";

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);
