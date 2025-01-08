import { render, screen } from "@testing-library/react"; // render renders React components into a virtual DOM for testing and screen provides utilities to query the virtual DOM
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import ProductGrid from "../components/ProductGrid";
import { vi } from "vitest"; // Vitest mocking and testing utility
import { ProductProvider } from "../context/ProductProvider";
import { CartProvider } from "../context/CartProvider";
import styles from "../styles/NavBar.module.css";
import userEvent from "@testing-library/user-event";
import { act } from "react";

// Mock the `useCart` hook
vi.mock("../hooks/useCart", () => ({
  // used to mock entire module
  useCart: vi.fn(), // used to mock functions and their return values
}));

// Import the mocked `useCart` hook
import { useCart } from "../hooks/useCart";

describe("NavBar Component", () => {
  // Starts a test suite for the NavBar component.

  const useCartMock = vi.mocked(useCart); // casts the mock to the correct type

  // Mock the full CartContextType structure
  const mockCartContext = {
    cartItems: [],
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    getTotalPrice: vi.fn(),
    getTotalQuantity: vi.fn(),
  };

  // Utility to render NavBar with a mocked router
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <ProductProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<ProductGrid />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useCartMock.mockReturnValue({
      ...mockCartContext,
      getTotalQuantity: () => 0,
    });
  });

  test("renders the navigation links", () => {
    renderWithRouter();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  test("renders cart badge when total quantity is greater than 0", () => {
    useCartMock.mockReturnValue({
      ...mockCartContext,
      getTotalQuantity: () => 5,
    });
    renderWithRouter();
    const cartBadge = screen.getByText("5");
    console.log(cartBadge.className); // Log the class of the element
    console.log(styles.cartCount); // Check the expected dynamic class name
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge.className).toContain(styles.cartCount);
  });

  test("does not render cart badge when total quantity is 0", () => {
    renderWithRouter();
    const cartBadge = screen.queryByText("0");
    expect(cartBadge).not.toBeInTheDocument();
  });

  test("links point to correct routes", () => {
    renderWithRouter();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute(
      "href",
      "/cart"
    );
  });

  test("navigates to the cart page", async () => {
    renderWithRouter();
    const cartLink = screen.getByRole("link", { name: /cart/i });
    // Wrap the click action with act() to ensure full processing
    await act(async () => {
      await userEvent.click(cartLink);
    });
    // Verify navigation occurred
    expect(window.location.pathname).toBe("/cart");
    // Check for the Cart page content
    const heading = await screen.findByRole("heading", { name: /your cart/i });
    expect(heading).toBeInTheDocument();
  });

  test("navigates to the home page", async () => {
    renderWithRouter();
    // Use `act()` to ensure all updates are flushed
    await act(async () => {
      await userEvent.click(screen.getByRole("link", { name: /home/i }));
    });
    // Debug the DOM after React has fully processed the updates
    console.log(screen.debug());
    // Now assertions can be made, as React has fully updated the route
    expect(window.location.pathname).toBe("/"); // This should pass
  });
});
