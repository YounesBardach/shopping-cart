import { useState, useEffect } from "react";

// product data example:
// {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest.",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }

// fetch response object example:
// {
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//       "content-type": "application/json",
//       "date": "Mon, 20 Dec 2024 12:00:00 GMT"
//     },
//     "body": "[{\"id\": 1, \"title\": \"Product 1\", \"price\": 19.99, \"description\": \"Description of Product 1\", \"category\": \"electronics\", \"image\": \"image_url\", \"rating\": {\"rate\": 4.5, \"count\": 150}}]",
//     "ok": true
//   }

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        // Ensure the response is JSON by checking the content type

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();

          // Validate the data
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
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
};

export default useProducts;
