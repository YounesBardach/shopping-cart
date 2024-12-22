import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  it("renders a nav element", () => {
    render(<NavBar />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("renders a list of 3 items", () => {
    render(<NavBar />);
    const links = screen.getAllByRole("listitem");
    expect(links).toHaveLength(3);
  });
});
