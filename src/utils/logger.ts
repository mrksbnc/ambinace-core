import pino, { type Logger } from 'pino';
import { name } from '../../package.json';

export const logger: Logger = pino({
	name,
	level: 'info',
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			translateTime: true,
		},
	},
});
