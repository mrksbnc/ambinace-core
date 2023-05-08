import { name, version } from 'package.json';

export const appConfig = Object.freeze({
	name,
	version,
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || 'development',
});
