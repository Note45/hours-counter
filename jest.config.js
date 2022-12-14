/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>'],
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  coverageDirectory: '../coverage',
  setupFiles: ['<rootDir>config-ts-auto-mock.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
