import type { THttpError } from './httpError.d';
import type { ERROR_NAME } from '@/data/constants/errorName';
import type { TBaseError, TBaseErrorConstructorArgs } from './baseError.d';

export default class BaseError extends Error implements TBaseError {
	public readonly message: string;
	public readonly errorName: ERROR_NAME;
	public readonly httpError: THttpError;
	public readonly stack?: string | undefined;

	constructor({ errorName, message, httpError, stack = undefined }: TBaseErrorConstructorArgs) {
		super(message);
		this.stack = stack;
		this.message = message;
		this.errorName = errorName;
		this.httpError = httpError;
	}
}
