import type { THttpError } from './httpError.d';
import type { ERROR_NAME } from '@/data/constants/errorName';
/**
 * Interface for the BaseError class.
 */
export type TBaseError = {
	/**
	 * The error message to be logged for debugging purposes.
	 */
	message: string;
	/**
	 * The name of the error.
	 */
	errorName: ERROR_NAME;
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
	message: string;
	/**
	 * The name of the error from the ERROR_NAME enum.
	 */
	errorName: ERROR_NAME;
	/*
	 * The HTTP error. This is used to determine the HTTP status code and message to be returned.
	 */
	httpError: THttpError;
	/**
	 * The stack trace of the error.
	 * This is used for debugging purposes.
	 */
	stack: string | undefined;
};
