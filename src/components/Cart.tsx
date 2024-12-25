// components/Cart.tsx

import { useCart } from "../hooks/useCart";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();

  const handleQuantityChange = (
    productId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = Math.max(1, Number(event.target.value)); // Ensure quantity is at least 1
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className={styles.cartItem}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <h2>{product.title}</h2>
                <p>{product.category}</p>
                <p>${product.price.toFixed(2)}</p>
                <div className={styles.cartItemQuantity}>
                  <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
                  <input
                    id={`quantity-${product.id}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(product.id, e)}
                    className={styles.quantityInput}
                  />
                </div>
                <button
                  onClick={() => handleRemoveItem(product.id)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={styles.cartTotal}>
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
