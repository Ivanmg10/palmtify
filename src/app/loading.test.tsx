import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Loading page", () => {
  test("renders loading image", async () => {
    const element = await Loading();
    render(element);
    expect(screen.getByAltText("Loading")).toBeInTheDocument();
  });
});
