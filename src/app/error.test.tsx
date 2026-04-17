import { render, screen } from "@testing-library/react";
import Error from "./error";

describe("Error page", () => {
  test("renders error heading", () => {
    render(<Error />);
    expect(
      screen.getByText("Error al recuperar el artista/album")
    ).toBeInTheDocument();
  });

  test("renders link to home page", () => {
    render(<Error />);
    const link = screen.getByText("Volver a la página principal");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/");
  });
});
