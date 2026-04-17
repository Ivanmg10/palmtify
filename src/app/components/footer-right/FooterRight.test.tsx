import { render, screen } from "@testing-library/react";
import FooterRight from "./FooterRight";

describe("FooterRight", () => {
  test("renders without crashing", () => {
    const { container } = render(<FooterRight />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("renders icon elements", () => {
    render(<FooterRight />);
    const svgs = document.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
