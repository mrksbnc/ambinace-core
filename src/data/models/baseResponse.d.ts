import type HTTP_STATUS_CODE from '../constants/httpStatusCode';
/**
 * Interface for the BaseResponse class.
 */
export declare interface TBaseResponse<T = null> {
	/**
	 * The data to be returned.
	 */
	data: T | null;
	/**
	 * The message to be returned.
	 * This is usually used for error messages.
	 * @remarks
	 * This is not the same as the HTTP status message.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	 */
	message: string;
	/**
	 * The HTTP status code to be returned.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	 */
	status: HTTP_STATUS_CODE;
	/**
	 * Whether the request was successful.
	 */
	success: boolean;
}
/**
 * Constructor arguments for the BaseResponse class.
 */
export declare type BaseResponseConstructorArgs<T = null> = {
	/**
	 * The data to be returned. If the request was not successful, this should be null.
	 * @default null
	 */
	data?: T | null;
	/**
	 * The message to be returned.
	 */
	message?: string;
	/**
	 * The HTTP status code to be returned.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	 * @default 200
	 */
	status?: HTTP_STATUS_CODE;
};
