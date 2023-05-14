/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	collectCoverage: true,
	testEnvironment: 'node',
	testMatch: ['**/*.spec.ts'],
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};
