module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '<rootDir>/src/**/*.test.js',
    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/tests/integration/**/*.spec.(js|jsx|ts|tsx)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
}
