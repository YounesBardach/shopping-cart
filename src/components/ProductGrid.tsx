import styles from "../styles/ProductGrid.module.css";
import useProducts from "../hooks/useProducts";
import ProductDetails from "./ProductDetails";
import useProductDetails from "../hooks/useProductDetails";

const ProductGrid = (): JSX.Element => {
  const { products, loading, error } = useProducts();
  const {
    isModalOpen,
    selectedProduct,
    quantity,
    openModal,
    closeModal,
    handleQuantityChange,
    handleAddToCart,
  } = useProductDetails();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div>
      {isModalOpen && selectedProduct ? (
        // Render the modal if a product is selected
        <ProductDetails
          product={selectedProduct}
          quantity={quantity}
          onClose={closeModal}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      ) : (
        // Render the grid if no modal is open
        <>
          <h1 className={styles.gridContainer__title1}>Our Products</h1>
          <div className={styles.gridContainer}>
            {products.map((product) => (
              <div
                key={product.id}
                className={styles.gridContainer__item}
                onClick={() => openModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.gridContainer__image}
                />
                <h2 className={styles.gridContainer__title2}>
                  {product.title}
                </h2>
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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
