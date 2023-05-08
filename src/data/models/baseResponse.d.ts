import type HTTP_STATUS_CODE from '../enums/httpStatusCode';

export interface TBaseResponse<T> {
	data: T | null;
	message: string;
	success: boolean;
	error: string | null;
	status: HTTP_STATUS_CODE;
}

export type BaseResponseConstructorArgs<T> = {
	data?: T;
	message: string;
	error?: string | null;
	status: HTTP_STATUS_CODE;
};
