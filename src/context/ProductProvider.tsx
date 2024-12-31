import { useState, useEffect, ReactNode } from "react";
import { ProductContext } from "./ProductContext";
import { Product } from "../types/models";

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({
  children,
}: ProductProviderProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No products found in the response.");
        }

        data.forEach((product: Product) => {
          if (!product.id || !product.title || !product.price) {
            throw new Error(
              `Product missing required fields: ${JSON.stringify(product)}`
            );
          }
        });

        setProducts(data);
      } else {
        throw new Error("The server did not return JSON.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch products:", err.message);
        setError(err.message);
      } else {
        console.error("Unexpected error type:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
