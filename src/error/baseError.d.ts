import type { THttpError } from './httpError.d';
import type { ERROR_NAME } from '../data/enums/errorName';

export type TBaseError = {
	message: string;
	errorName: ERROR_NAME;
	httpError: THttpError;
};

export type TBaseErrorConstructorArgs = {
	message: string;
	errorName: ERROR_NAME;
	httpError: THttpError;
	stack: string | undefined;
};
