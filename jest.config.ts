import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
  },
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['index.ts', 'config.ts'],
  coverageReporters: [['lcov', { projectRoot: '.' }]],
  coverageThreshold: {
    global: {
      branches: 80, // Possible paths the logic could follow
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  roots: ['.'],
  testMatch: ['**/*.test.*'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper:
    pathsToModuleNameMapper(
      compilerOptions.paths ?? {
        '@/*': ['src/*'],
      },
    ) ?? {},
};

export default jestConfig;
