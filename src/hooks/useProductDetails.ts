import { useState } from "react";
import { Product } from "../types/models";

const useModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Open the modal with the selected product
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close the modal and reset the state
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Clear the selected product
    setQuantity(1); // Reset the quantity to 1 when closing the modal
  };

  // Handle changes to the quantity input field
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(event.target.value)); // Ensure at least 1
    setQuantity(newQuantity);
  };

  // Handle adding the product to the cart (placeholder logic)
  const handleAddToCart = () => {
    console.log("Added to cart:", selectedProduct, "Quantity:", quantity);
    closeModal(); // Close modal after adding to cart
  };

  return {
    isModalOpen,
    selectedProduct,
    quantity,
    openModal,
    closeModal,
    handleQuantityChange,
    handleAddToCart,
  };
};

export default useModal;
