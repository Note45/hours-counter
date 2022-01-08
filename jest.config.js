/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>'],
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePaths: ['<rootDir>'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  coverageDirectory: '../coverage',
  setupFiles: ['<rootDir>config-ts-auto-mock.ts'],
};
