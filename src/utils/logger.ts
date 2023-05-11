import type { TLog } from './logger.d';
import pino, { type Logger } from 'pino';
import { name } from '../../package.json';

let sharedInstance: Log | null = null;

export default class Log implements TLog {
	static get sharedInstance(): Log {
		if (sharedInstance === null) {
			sharedInstance = new Log();
		}
		return sharedInstance;
	}

	readonly baseLogger: Logger;

	constructor() {
		this.baseLogger = pino({
			name,
			level: 'info',
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'yyyy-dd-mm, h:MM:ss TT',
				},
			},
		});
	}
}
