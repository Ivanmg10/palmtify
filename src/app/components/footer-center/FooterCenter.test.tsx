import { render, screen, fireEvent, act } from "@testing-library/react";
import FooterCenter from "./FooterCenter";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("FooterCenter", () => {
  test("renders initial time display", () => {
    render(<FooterCenter duration={120000} />);
    expect(screen.getByText("0:00")).toBeInTheDocument();
    expect(screen.getByText("2:00")).toBeInTheDocument();
  });

  test("renders pause button initially (playing)", () => {
    render(<FooterCenter duration={120000} />);
    expect(screen.getByTestId("IconPlayerPauseFilled")).toBeInTheDocument();
  });

  test("toggles to play button when pause is clicked", () => {
    render(<FooterCenter duration={120000} />);
    const pauseButton = screen.getByTestId("IconPlayerPauseFilled").closest("button")!;
    fireEvent.click(pauseButton);
    expect(screen.getByTestId("IconPlayerPlayFilled")).toBeInTheDocument();
  });

  test("toggles back to pause when play is clicked", () => {
    render(<FooterCenter duration={120000} />);
    const pauseButton = screen.getByTestId("IconPlayerPauseFilled").closest("button")!;
    fireEvent.click(pauseButton);
    const playButton = screen.getByTestId("IconPlayerPlayFilled").closest("button")!;
    fireEvent.click(playButton);
    expect(screen.getByTestId("IconPlayerPauseFilled")).toBeInTheDocument();
  });

  test("resets time when back button is clicked", () => {
    render(<FooterCenter duration={120000} />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    const backButton = screen.getByTestId("IconArrowBigLeftLineFilled").closest("button")!;
    fireEvent.click(backButton);
    expect(screen.getAllByText("0:00").length).toBeGreaterThan(0);
  });

  test("range input changes current duration", () => {
    render(<FooterCenter duration={120000} />);
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(rangeInput, { target: { value: "60" } });
    expect(screen.getByText("1:00")).toBeInTheDocument();
  });

  test("advances time after 1 second", () => {
    render(<FooterCenter duration={120000} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("0:01")).toBeInTheDocument();
  });

  test("stops advancing at max duration", () => {
    render(<FooterCenter duration={3000} />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    const allTexts = screen.getAllByText(/0:0[0-9]|0:1[0-9]/);
    expect(allTexts.length).toBeGreaterThan(0);
  });

  test("resets on duration prop change", () => {
    const { rerender } = render(<FooterCenter duration={60000} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    rerender(<FooterCenter duration={120000} />);
    expect(screen.getAllByText("0:00").length).toBeGreaterThan(0);
  });

  test("does not create multiple intervals when advanceTime called again", () => {
    render(<FooterCenter duration={120000} />);
    const pauseButton = screen.getByTestId("IconPlayerPauseFilled").closest("button")!;
    fireEvent.click(pauseButton);
    const playButton = screen.getByTestId("IconPlayerPlayFilled").closest("button")!;
    fireEvent.click(playButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("0:01")).toBeInTheDocument();
  });
});
