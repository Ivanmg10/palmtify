import { render, screen } from "@testing-library/react";
import PalmtifyHeader from "./MainHeader";

describe("PalmtifyHeader", () => {
  test("renders search input", () => {
    render(<PalmtifyHeader />);
    expect(screen.getByPlaceholderText("Buscar")).toBeInTheDocument();
  });

  test("renders home link", () => {
    render(<PalmtifyHeader />);
    const homeLink = screen.getByRole("link", { name: "" });
    expect(homeLink).toBeInTheDocument();
  });

  test("renders navigation", () => {
    const { container } = render(<PalmtifyHeader />);
    expect(container.querySelector("nav")).toBeInTheDocument();
  });
});
