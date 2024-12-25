import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart"; // Assuming you have a cart context or hook
import Toast from "./Toast";
import styles from "../styles/ProductDetails.module.css";

const ProductDetails = (): JSX.Element => {
  const location = useLocation();
  const product = location.state?.product;
  const { addToCart } = useCart(); // Assuming you have a hook for cart actions

  const [quantity, setQuantity] = useState<number>(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(event.target.value)); // Ensure at least 1
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity); // Add the product to cart logic
      setToastMessage(`${product.title} has been added to your cart!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Automatically dismiss the toast after 3 seconds
    }
  };

  if (!product) {
    return <div className={styles.error}>Product not found.</div>;
  }

  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetails__content}>
        <Link to="/" className={styles.productDetails__closeButton}>
          &times;
        </Link>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productDetails__image}
        />
        <h2 className={styles.productDetails__title}>{product.title}</h2>
        <p className={styles.productDetails__price}>
          ${product.price.toFixed(2)}
        </p>
        <p className={styles.productDetails__description}>
          {product.description}
        </p>
        <p className={styles.productDetails__category}>
          Category: {product.category}
        </p>
        <div className={styles.productDetails__rating}>
          <span>Rating: {product.rating.rate} ⭐</span>
          <span>({product.rating.count} reviews)</span>
        </div>

        <div className={styles.productDetails__quantity}>
          <label
            htmlFor="quantity"
            className={styles.productDetails__quantityLabel}
          >
            Quantity:{" "}
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            min={1}
            onChange={handleQuantityChange}
            className={styles.productDetails__quantityInput}
          />
        </div>

        <button
          className={styles.productDetails__addToCartButton}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      {/* Show the Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default ProductDetails;
