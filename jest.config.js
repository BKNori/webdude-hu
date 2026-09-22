/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  /**
   * KIZÁRÓLAG az élő forráskód tesztjei futnak a Jest alatt (jsdom).
   * Az `e2e/**` Playwright specifikációk a `npm run test:e2e`-vel futnak,
   * a `_mentesek/**` pedig archivált másolat (nem élő kód).
   */
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{test,spec}.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/e2e/',
    '<rootDir>/_mentesek/',
    '<rootDir>/deploy_dist/',
    '<rootDir>/functions/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/_mentesek/'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      lines: 80,
      statements: 80,
    },
  },
};
module.exports = config;
