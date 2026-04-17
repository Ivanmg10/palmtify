import { render, screen } from "@testing-library/react";
import AlbumsButtons from "./AlbumsButtons";

describe("AlbumsButtons", () => {
  test("renders add and download icons when hasTracks is true", () => {
    render(<AlbumsButtons hasTracks={true} />);
    expect(screen.getByTestId("IconCirclePlus")).toBeInTheDocument();
    expect(screen.getByTestId("IconCircleArrowDown")).toBeInTheDocument();
  });

  test("renders Follow button when hasTracks is false", () => {
    render(<AlbumsButtons hasTracks={false} />);
    expect(screen.getByText("Follow")).toBeInTheDocument();
  });

  test("does not render Follow button when hasTracks is true", () => {
    render(<AlbumsButtons hasTracks={true} />);
    expect(screen.queryByText("Follow")).not.toBeInTheDocument();
  });

  test("renders play icon always", () => {
    render(<AlbumsButtons hasTracks={true} />);
    expect(screen.getByTestId("IconPlayerPlayFilled")).toBeInTheDocument();
  });
});
