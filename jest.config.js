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



  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      lines: 80,
      statements: 80,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
};
module.exports = config;
