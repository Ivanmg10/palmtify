jest.mock("@/app/utils/apliClient", () => ({
  getArtist: jest.fn(),
}));

jest.mock("../home-page-top-section/HomePageTopSection", () => ({
  __esModule: true,
  default: () => <div data-testid="top-section">TopSection</div>,
}));

jest.mock("../home-page-sliders/HomePageSliders", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid={`slider-${title}`}>{title}</div>
  ),
}));

import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { getArtist } from "@/app/utils/apliClient";

const mockArtist = {
  idArtist: "100",
  idArtis: "100",
  strArtist: "Nirvana",
  strArtistThumb: "https://example.com/nirvana.jpg",
  intBornYear: "1987",
  strStyle: "Grunge",
  strGenre: "Rock",
  strBiographyEN: "American rock band.",
};

beforeEach(() => {
  (getArtist as jest.Mock).mockResolvedValue(mockArtist);
});

describe("HomePage", () => {
  test("renders top section", async () => {
    const element = await HomePage();
    render(element);
    expect(screen.getByTestId("top-section")).toBeInTheDocument();
  });

  test("renders all sliders", async () => {
    const element = await HomePage();
    render(element);
    expect(screen.getByTestId("slider-You")).toBeInTheDocument();
    expect(screen.getByTestId("slider-Recently played")).toBeInTheDocument();
    expect(screen.getByTestId("slider-Jump back in")).toBeInTheDocument();
    expect(screen.getByTestId("slider-Your favorite artist")).toBeInTheDocument();
    expect(screen.getByTestId("slider-Hip Hop 90's")).toBeInTheDocument();
  });
});
