import type { THttpError } from './httpError.d';
import type { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import type { TBaseError, TBaseErrorConstructorArgs } from './baseError.d';

export default class BaseError extends Error implements TBaseError {
	public readonly errorName: ERROR_NAME;
	public readonly httpError: THttpError;
	public readonly message: ERROR_MESSAGE | string;

	constructor({ errorName, message, httpError }: TBaseErrorConstructorArgs) {
		super(message);
		this.message = message;
		this.errorName = errorName;
		this.httpError = httpError;
	}
}
