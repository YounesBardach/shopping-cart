import { ReactNode, useState } from "react";
import { CartContext } from "./CartContext";
import { Product } from "../types/models";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantityToAdd: number) => {
    setCartItems((currentCartItems) => {
      const existingCartItem = currentCartItems.find(
        (cartItem) => cartItem.product.id === product.id
      );

      if (existingCartItem) {
        return currentCartItems.map((cartItem) =>
          cartItem.product.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem
        );
      }

      return [...currentCartItems, { product, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((currentCartItems) =>
      currentCartItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((currentCartItems) =>
      currentCartItems.map((cartItem) =>
        cartItem.product.id === productId
          ? { ...cartItem, quantity: Math.max(1, quantity) }
          : cartItem
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
