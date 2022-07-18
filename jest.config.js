const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('.//tsconfig.json')

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};
