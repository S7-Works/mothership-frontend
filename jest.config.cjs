module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
