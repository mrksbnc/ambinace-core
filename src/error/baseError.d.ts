import type { THttpError } from './httpError.d';
import type { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
/**
 * Interface for the BaseError class.
 */
export type TBaseError = {
	/**
	 * The error message to be logged for debugging purposes.
	 */
	message: ERROR_MESSAGE | string;
	/**
	 * The name of the error.
	 */
	errorName: ERROR_NAME | string;
	/*
	 * The HTTP error. This is used to determine the HTTP status code and message to be returned.
	 */
	httpError: THttpError;
};
/**
 * Constructor arguments for the BaseError class.
 */
export type TBaseErrorConstructorArgs = {
	/**
	 * The error message to be logged for debugging purposes.
	 */
	message: ERROR_MESSAGE | string;
	/**
	 * The name of the error from the ERROR_NAME enum.
	 */
	errorName: ERROR_NAME;
	/*
	 * The HTTP error. This is used to determine the HTTP status code and message to be returned.
	 */
	httpError: THttpError;
};
