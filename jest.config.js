/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['./test'],
  moduleNameMapper: {
    '^@use-gesture/core/(.*)$': '<rootDir>/packages/core/src/$1.ts',
    '^@use-gesture/core$': '<rootDir>/packages/core/src/index.ts',
  },
  setupFilesAfterEnv: ['./setupPointerEvent.js'],
  setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
}
