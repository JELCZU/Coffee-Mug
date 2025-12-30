export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.jest.json",
    },
  },

  // ⬇️ mówi Jestowi, że .ts to ESM
  extensionsToTreatAsEsm: [".ts"],

  // ⬇️ NAPRAWIA importy z .js → .ts
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // mapuje importy lokalne .js → .ts
  },

  testMatch: ["**/tests/**/*.test.ts"],
};
