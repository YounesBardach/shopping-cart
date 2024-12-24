import { render, screen } from "@testing-library/react";
import App from "../App.tsx";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);

    screen.debug();
  });
});
