import { render, screen, waitFor } from "@testing-library/react";
import Cart from "../components/Cart";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("../hooks/useCart", () => ({
  useCart: vi.fn(),
}));

import { useCart } from "../hooks/useCart";
const useCartMock = vi.mocked(useCart);

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 49.99,
  description: "A great product for testing.",
  category: "Testing Tools",
  image: "https://via.placeholder.com/150",
  rating: { rate: 4.5, count: 100 },
};

const mockCartContext = {
  cartItems: [],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  getTotalPrice: vi.fn(),
  getTotalQuantity: vi.fn(),
};

describe("Cart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays the correct message when the cart is empty", () => {
    useCartMock.mockReturnValue({
      ...mockCartContext,
      getTotalQuantity: () => 0,
    });
    render(<Cart />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  test("displays cart items and allows quantity updates", async () => {
    const mockUpdateQuantity = vi.fn();
    useCartMock.mockReturnValue({
      ...mockCartContext,
      cartItems: [{ product: mockProduct, quantity: 1 }],
      updateQuantity: mockUpdateQuantity,
      getTotalPrice: () => 49.99,
    });

    render(<Cart />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    const quantityInput = screen.getByLabelText(
      /quantity/i
    ) as HTMLInputElement;
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "2");
    await waitFor(() => {
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 12);
    });
  });

  test("removes item from the cart", async () => {
    const mockRemoveFromCart = vi.fn();

    useCartMock.mockReturnValue({
      ...mockCartContext,
      cartItems: [{ product: mockProduct, quantity: 1 }],
      getTotalPrice: () => 49.99,
      removeFromCart: mockRemoveFromCart,
    });

    render(<Cart />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    const removeButton = screen.getByText(/remove/i);
    userEvent.click(removeButton);
    await waitFor(() => {
      expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });
  });

  test("calculates the total price correctly", async () => {
    useCartMock.mockReturnValue({
      ...mockCartContext,
      cartItems: [
        { product: mockProduct, quantity: 1 },
        { product: mockProduct, quantity: 1 },
      ],
      getTotalPrice: () => 99.98,
    });

    render(<Cart />);

    expect(screen.getByText("Total: $99.98")).toBeInTheDocument();
  });
});
