import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider"); //if useProduct is used in a component that is not a descendant of ProductProvider
  }
  return context;
};
