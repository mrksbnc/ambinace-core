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

	readonly fileLogger: Logger;
	readonly baseLogger: Logger;
	readonly consoleLogger: Logger;

	constructor() {
		this._logPath = resolve(__dirname, '../logs');

		if (!existsSync(this._logPath)) {
			mkdirSync(this._logPath);
		}

		this.baseLogger = this._createBaseLogger();
		this.fileLogger = this._createFileLogger();
		this.consoleLogger = this._createConsoleLogger();
		this.baseLogger.info('logger initialized!', { path: this._logPath });
	}

	private _createBaseLogger(): Logger {
		return createLogger({
			level: 'info',
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
				new winston.transports.File({
					filename: `${this._logPath}/http.log`,
					level: 'http',
				}),
				new winston.transports.Console({
					format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
				}),
			],
		});
	}

	private _createFileLogger(): Logger {
		return createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				winston.format.json(),
			),
			transports: [
				new winston.transports.File({
					filename: `${this._logPath}/error.log`,
					level: 'error',
				}),
				new winston.transports.File({
					filename: `${this._logPath}/combined.log`,
				}),
				new winston.transports.File({
					filename: `${this._logPath}/http.log`,
					level: 'http',
				}),
			],
		});
	}

	private _createConsoleLogger(): Logger {
		return createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				winston.format.json(),
			),
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
				}),
			],
		});
	}
}
