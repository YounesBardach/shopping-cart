import React from "react";
import styles from "../styles/ProductDetails.module.css";
import { Product } from "../types/models";

interface ProductDetailsProps {
  product: Product;
  quantity: number;
  onClose: () => void;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  quantity,
  onClose,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetails__content}>
        <button
          className={styles.productDetails__closeButton}
          onClick={onClose}
        >
          &times;
        </button>
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
            onChange={onQuantityChange}
            className={styles.productDetails__quantityInput}
          />
        </div>
        <button
          className={styles.productDetails__addToCartButton}
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
