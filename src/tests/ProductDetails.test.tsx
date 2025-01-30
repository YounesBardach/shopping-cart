import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import ProductDetails from "../components/ProductDetails";
import { useCart } from "../hooks/useCart";
import userEvent from "@testing-library/user-event";

vi.mock("../hooks/useCart");

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 49.99,
  description: "A great product for testing.",
  category: "Testing Tools",
  image: "https://via.placeholder.com/150",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe("ProductDetails Component", () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCart).mockReturnValue({
      addToCart: mockAddToCart,
      cartItems: [],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getTotalPrice: vi.fn(() => 0),
      getTotalQuantity: vi.fn(() => 0),
    });
  });

  test("renders product details correctly", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/product/1", state: { product: mockProduct } },
        ]}
      >
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(
      screen.getByText("A great product for testing.")
    ).toBeInTheDocument();
    expect(screen.getByText("Category: Testing Tools")).toBeInTheDocument();
    expect(screen.getByText("Rating: 4.5 ⭐")).toBeInTheDocument();
    expect(screen.getByText("(100 reviews)")).toBeInTheDocument();
  });

  test("adds product to cart and shows toast", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/product/1", state: { product: mockProduct } },
        ]}
      >
        <ProductDetails />
      </MemoryRouter>
    );

    const quantityInput = screen.getByLabelText(
      /quantity/i
    ) as HTMLInputElement;
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "5");
    await waitFor(() => {
      expect(quantityInput).toHaveValue(15);
    });

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    userEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 15);
    });

    expect(
      screen.getByText(/test product has been added to your cart!/i)
    ).toBeInTheDocument();
  });

  test("shows error message if product is not found", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/product/1", state: {} }]}>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  test("does not allow quantity to be less than 1", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/product/1", state: { product: mockProduct } },
        ]}
      >
        <ProductDetails />
      </MemoryRouter>
    );

    const quantityInput = screen.getByLabelText(/quantity/i);

    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "0");
    expect(quantityInput).toHaveValue(1);

    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "-5");
    expect(quantityInput).toHaveValue(1);
  });
});
