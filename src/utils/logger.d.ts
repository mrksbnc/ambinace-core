import type { Logger } from 'winston';

export type TLog = {
	readonly baseLogger: Logger;
	readonly fileLogger: Logger;
	readonly consoleLogger: Logger;
};
