import { render, screen } from "@testing-library/react";
import LateralComponentTop from "./LateralComponentTop";

describe("LateralComponentTop", () => {
  test("renders Home link", () => {
    render(<LateralComponentTop />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders Search option", () => {
    render(<LateralComponentTop />);
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("Home link points to /", () => {
    render(<LateralComponentTop />);
    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink.getAttribute("href")).toBe("/");
  });
});
