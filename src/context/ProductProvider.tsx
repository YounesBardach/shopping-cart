// context/ProductProvider.tsx
import React, { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { Product } from "../types/models";

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  const fetchProducts = async () => {
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
      setError("Failed to fetch products");
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
