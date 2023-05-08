module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	extends: ['prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	ignorePatterns: ['node_modules/', 'dist/', 'coverage/', 'src/**/*.test.ts'],
	rules: {
		'no-tabs': 0,
		'no-unused-expressions': 1,
		indent: [1, 'tab', { SwitchCase: 1 }],
		'@typescript-eslint/no-unused-vars': 1,
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
};
