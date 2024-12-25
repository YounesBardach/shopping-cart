import styles from "../styles/ProductGrid.module.css";
import { useProduct } from "../hooks/useProducts"; // Importing the custom hook
import { Link } from "react-router-dom";

const ProductGrid = (): JSX.Element => {
  // Using the custom useProduct hook to access products, loading, and error state
  const { products, loading, error } = useProduct();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className={styles.gridContainer__title1}>Our Products</h1>
      <div className={styles.gridContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.gridContainer__item}>
            <Link
              to={`/product/${product.id}`}
              state={{ product }} // Pass the product data as state
              className={styles.gridContainer__link}
            >
              <img
                src={product.image}
                alt={product.title}
                className={styles.gridContainer__image}
              />
              <h2 className={styles.gridContainer__title2}>{product.title}</h2>
              <p className={styles.gridContainer__price}>
                ${product.price.toFixed(2)}
              </p>
              <p className={styles.gridContainer__description}>
                {product.description.length > 100
                  ? `${product.description.substring(0, 100)}...`
                  : product.description}
              </p>
              <p className={styles.gridContainer__category}>
                {product.category}
              </p>
              <div className={styles.gridContainer__rating}>
                <span>Rating: {product.rating.rate} ⭐</span>
                <span>({product.rating.count} reviews)</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
