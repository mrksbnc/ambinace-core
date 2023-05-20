import type { Logger } from 'winston';

export declare type TLog = {
	readonly baseLogger: Logger;
	createInfoMessageBlock(message: string | string[]): void;
};
