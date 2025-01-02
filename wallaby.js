module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts'],
    tests: ['src/**/*.test.ts'],
    testFramework: {
      // the jest configuration file path
      // (relative to project root)
      configFile: './jest.config.wallaby.ts',
    },
  };
};
