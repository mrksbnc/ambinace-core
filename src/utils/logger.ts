import { resolve } from 'path';
import type { TLog } from './logger.d';
import { existsSync, mkdirSync } from 'fs';
import winston, { createLogger, type Logger } from 'winston';

let sharedInstance: Log | null = null;

export default class Log implements TLog {
	private readonly _logPath: string | null = null;

	public static get sharedInstance(): Log {
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
		this.createInfoMessageBlock([
			`__logConstructor: Created log directory at: ${this._logPath}`,
			'__logConstructor: Logger initialized...',
		]);
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

	public createBlockSeparator(): void {
		this.baseLogger.info(`----------------------------------------------`);
	}

	public createMessageLine(message: string): void {
		this.baseLogger.info(`* ${message}`);
	}

	public createInfoMessageBlock(message: string | string[]): void {
		if (typeof message === 'string') {
			this.baseLogger.info(`* ${message}`);
			this.createBlockSeparator();
			return;
		}

		this.createBlockSeparator();
		for (const line of message) {
			this.baseLogger.info(`* ${line}`);
		}
		this.createBlockSeparator();
	}
}
