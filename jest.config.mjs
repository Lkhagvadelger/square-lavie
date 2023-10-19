import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    //"@ui/*": ["lib/core/ui/*"],
    // "@api/*": ["lib/core/api/*"],
    // "@util/*": ["lib/core/util/*"],
    // "@lib/*": ["lib/*"],
    "^@ui/(.*)$": "<rootDir>/lib/core/ui/$1",
    "^@api/(.*)$": "<rootDir>/lib/core/api/$1",
    "^@util/(.*)$": "<rootDir>/lib/core/util/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
