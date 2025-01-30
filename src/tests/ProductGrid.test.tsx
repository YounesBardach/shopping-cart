import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import ProductGrid from "../components/ProductGrid";
import { useProduct } from "../hooks/useProduct";

vi.mock("../hooks/useProduct");
const mockUseProduct = vi.mocked(useProduct);

describe("ProductGrid Component", () => {
  const renderWithRouter = (component: JSX.Element) =>
    render(<BrowserRouter>{component}</BrowserRouter>);

  const mockProductContext = {
    products: [],
    loading: false,
    error: null,
    fetchProducts: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays loading state", () => {
    mockUseProduct.mockReturnValue({ ...mockProductContext, loading: true });

    renderWithRouter(<ProductGrid />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays error message", () => {
    mockUseProduct.mockReturnValue({
      ...mockProductContext,
      loading: false,
      error: "Failed to fetch products",
    });

    renderWithRouter(<ProductGrid />);
    expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
  });

  test("displays products when available", () => {
    mockUseProduct.mockReturnValue({
      ...mockProductContext,
      loading: false,
      products: [
        {
          id: 1,
          title: "Product 1",
          price: 100,
          description: "A cool product",
          category: "Category 1",
          image: "https://via.placeholder.com/150",
          rating: { rate: 4.5, count: 10 },
        },
      ],
    });

    renderWithRouter(<ProductGrid />);

    expect(screen.getByText(/our products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  test("links to product details page with state", () => {
    mockUseProduct.mockReturnValue({
      ...mockProductContext,
      loading: false,
      products: [
        {
          id: 1,
          title: "Product 1",
          price: 100,
          description: "A cool product",
          category: "Category 1",
          image: "https://via.placeholder.com/150",
          rating: { rate: 4.5, count: 10 },
        },
      ],
    });

    renderWithRouter(<ProductGrid />);

    const link = screen.getByRole("link", { name: /product 1/i });
    expect(link).toHaveAttribute("href", "/product/1");
  });
});
