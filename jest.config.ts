export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup/testDB.ts'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/modules/**/*.ts'],
};
