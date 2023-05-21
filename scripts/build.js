/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
const { Generator } = require('npm-dts');
const { dependencies } = require('../package.json');

new Generator({
	entry: 'src/index.ts',
	output: 'dist/index.d.ts',
}).generate();
/**
 * @type {import('esbuild').BuildOptions}
 */
const buildConfig = {
	bundle: true,
	minify: true,
	format: 'cjs',
	outdir: 'dist',
	platform: 'node',
	entryPoints: ['src/index.ts'],
	external: Object.keys(dependencies),
};

build(buildConfig).catch(() => process.exit(1));
