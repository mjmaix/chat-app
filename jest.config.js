module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['json', 'html'],

  // preset: 'ts-jest/presets/js-with-ts',
  preset: 'react-native',
  transform: {
    '.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    'styled-components/native':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec|snap))\\.(ts|tsx|js)$',
};
