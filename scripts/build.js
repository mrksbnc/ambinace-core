/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
const { Generator } = require('npm-dts');
const { dependencies } = require('../package.json');

new Generator({
	entry: 'src/index.ts',
	output: 'dist/index.d.ts',
}).generate();

const sharedConfig = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	external: Object.keys(dependencies),
};

build({
	...sharedConfig,
	platform: 'node',
	outfile: 'dist/index.js',
});

build({
	...sharedConfig,
	format: 'esm',
	platform: 'neutral',
	outfile: 'dist/index.esm.js',
});
