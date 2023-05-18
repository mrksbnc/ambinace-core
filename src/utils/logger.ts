import { resolve } from 'path';
import type { TLog } from './logger.d';
import { existsSync, mkdirSync } from 'fs';
import winston, { createLogger, type Logger } from 'winston';

let sharedInstance: Log | null = null;

export default class Log implements TLog {
	private readonly _logPath: string | null = null;

	static get sharedInstance(): Log {
		if (sharedInstance === null) {
			sharedInstance = new Log();
		}
		return sharedInstance;
	}

	readonly baseLogger: Logger;

	constructor() {
		this._logPath = resolve(__dirname, '../logs');

		if (!existsSync(this._logPath)) {
			mkdirSync(this._logPath);
		}

		this.baseLogger = this._createBaseLogger();
		this.baseLogger.info(`****************************************`);
		this.baseLogger.info(`* __logConstructor: Created log directory at: ${this._logPath}`);
		this.baseLogger.info('* __logConstructor: Logger initialized...', { path: this._logPath });
	}

	private _createBaseLogger(): Logger {
		return createLogger({
			level: 'http',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				winston.format.simple(),
			),
			transports: [
				new winston.transports.File({
					filename: `${this._logPath}/error.log`,
					level: 'error',
				}),
				new winston.transports.File({
					filename: `${this._logPath}/combined.log`,
				}),
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize({
							message: false,
						}),
						winston.format.timestamp({
							format: 'YYYY-MM-DD hh:mm:ss A',
						}),
						winston.format.align(),
						winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message.trim()}`),
					),
				}),
			],
		});
	}
}
