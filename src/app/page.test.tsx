jest.mock("./components/palmtify-home-page/HomePage", () => ({
  __esModule: true,
  default: () => <div data-testid="homepage">HomePage</div>,
}));

import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  test("renders HomePage component", () => {
    render(<Home />);
    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });
});
