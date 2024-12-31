import { useCart } from "../hooks/useCart";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();

  const handleQuantityChange = (
    productId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = Math.max(1, Number(event.target.value));
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <div className={styles["cart__container"]}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles["cart__items"]}>
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className={styles["cart__item"]}>
              <img
                src={product.image}
                alt={product.title}
                className={styles["cart__item-image"]}
              />
              <div className={styles["cart__item-details"]}>
                <h2>{product.title}</h2>
                <p>{product.category}</p>
                <p>${product.price.toFixed(2)}</p>
                <div className={styles["cart__item-quantity"]}>
                  <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
                  <input
                    id={`quantity-${product.id}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(product.id, e)}
                    className={styles["cart__quantity-input"]}
                  />
                </div>
                <button
                  onClick={() => handleRemoveItem(product.id)}
                  className={styles["cart__remove-button"]}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={styles["cart__total"]}>
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            <button className={styles["cart__checkout-button"]}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
