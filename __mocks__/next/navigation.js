module.exports = {
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn() })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
};
