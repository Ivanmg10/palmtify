module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/image$": "<rootDir>/__mocks__/next/image.js",
    "^next/link$": "<rootDir>/__mocks__/next/link.js",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.js",
    "^next/font/google$": "<rootDir>/__mocks__/next/fontGoogle.js",
    "^next/server$": "<rootDir>/__mocks__/next/server.js",
    "^@tabler/icons-react$": "<rootDir>/__mocks__/tablerIconsMock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/types.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/globals.css",
    "!src/**/*.css",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
