import type { Logger } from 'winston';

export type TLog = {
	readonly baseLogger: Logger;
	createInfoMessageBlock(message: string | string[]): void;
};
