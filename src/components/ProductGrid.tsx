import styles from "../styles/ProductGrid.module.css";
import useProducts from "../hooks/useProducts";

const ProductGrid = (): JSX.Element => {
  const { products, loading, error } = useProducts(); // Use the custom hook

  if (loading) {
    return <div className={styles.loading}>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>; // Error state
  }

  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <div key={product.id} className={styles.gridContainer__item}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.gridContainer__image}
          />
          <h3 className={styles.gridContainer__title}>{product.title}</h3>
          <p className={styles.gridContainer__price}>
            ${product.price.toFixed(2)}
          </p>
          <p className={styles.gridContainer__description}>
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
          <p className={styles.gridContainer__category}>{product.category}</p>
          <div className={styles.gridContainer__rating}>
            <span>Rating: {product.rating.rate} ⭐</span>
            <span>({product.rating.count} reviews)</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
