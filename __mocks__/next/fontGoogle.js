module.exports = {
  Poppins: jest.fn(() => ({ className: "mock-poppins", variable: "--font-poppins" })),
  Roboto: jest.fn(() => ({ className: "mock-roboto", variable: "--font-roboto" })),
};
