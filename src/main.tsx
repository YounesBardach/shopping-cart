import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "modern-normalize/modern-normalize.css";
import "./styles/main.module.css";
import App from "./App.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import Cart from "./components/Cart.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import { ProductProvider } from "./context/ProductProvider";

// Set up the router with the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    ), // Wrap the App component with both CartProvider and ProductProvider
    children: [
      {
        path: "/",
        element: <ProductGrid />, // This is your product grid component
      },
      {
        path: "/cart",
        element: <Cart />, // Cart page
      },
      {
        path: "/product/:id",
        element: <ProductDetails />, // Dynamic route for product details
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
