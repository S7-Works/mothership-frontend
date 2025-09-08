module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  // Explicitly ignore the Playwright E2E test directory
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/' 
  ],
  // Correctly configure babel-jest to transform TSX files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { 
      presets: [
        '@babel/preset-env', 
        ['@babel/preset-react', { runtime: 'automatic' }], 
        '@babel/preset-typescript'
      ] 
    }],
  },
};