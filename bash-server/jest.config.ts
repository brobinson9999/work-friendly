import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';
const tsJestPreset = createDefaultEsmPreset();

const config: Config = {
  ...tsJestPreset,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/src/'],
};

export default config;
