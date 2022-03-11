const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  coverageReporters: ["json-summary", "text"],
  roots: [
    "<rootDir>/pages",
    "<rootDir>/hooks",
    "<rootDir>/components",
    "<rootDir>/lib",
  ],
  collectCoverageFrom: ["<rootDir>/**"],
};

module.exports = createJestConfig(customJestConfig);
