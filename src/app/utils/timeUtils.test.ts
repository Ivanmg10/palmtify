import {
  formatMilliseconds,
  formatSeconds,
  formatNumber,
  msToSeconds,
} from "./timeUtils";

describe("formatMilliseconds", () => {
  test("formats ms to m:ss with padding", () => {
    expect(formatMilliseconds(65000)).toBe("1:05");
  });

  test("formats ms with double digit seconds", () => {
    expect(formatMilliseconds(90000)).toBe("1:30");
  });

  test("formats ms with zero seconds", () => {
    expect(formatMilliseconds(60000)).toBe("1:00");
  });

  test("formats ms less than a minute", () => {
    expect(formatMilliseconds(9000)).toBe("0:09");
  });

  test("formats 0 ms", () => {
    expect(formatMilliseconds(0)).toBe("0:00");
  });
});

describe("formatSeconds", () => {
  test("formats seconds to m:ss with padding", () => {
    expect(formatSeconds(65)).toBe("1:05");
  });

  test("formats seconds with double digit seconds", () => {
    expect(formatSeconds(90)).toBe("1:30");
  });

  test("formats seconds with zero seconds", () => {
    expect(formatSeconds(60)).toBe("1:00");
  });

  test("formats 0 seconds", () => {
    expect(formatSeconds(0)).toBe("0:00");
  });

  test("formats seconds less than a minute", () => {
    expect(formatSeconds(9)).toBe("0:09");
  });
});

describe("formatNumber", () => {
  test("formats number with dot separators", () => {
    expect(formatNumber(1000000)).toBe("1.000.000");
  });

  test("formats small numbers without separators", () => {
    expect(formatNumber(999)).toBe("999");
  });

  test("formats thousands", () => {
    expect(formatNumber(1234)).toBe("1.234");
  });

  test("formats 0", () => {
    expect(formatNumber(0)).toBe("0");
  });
});

describe("msToSeconds", () => {
  test("converts ms to seconds and floors", () => {
    expect(msToSeconds(1500)).toBe(1);
  });

  test("converts full seconds", () => {
    expect(msToSeconds(60000)).toBe(60);
  });

  test("converts 0 ms", () => {
    expect(msToSeconds(0)).toBe(0);
  });
});
