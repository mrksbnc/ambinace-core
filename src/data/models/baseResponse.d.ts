import type HTTP_STATUS_CODE from '../enums/httpStatusCode';

export interface TBaseResponse<T = null> {
	data: T | null;
	message: string;
	success: boolean;
	status: HTTP_STATUS_CODE;
}

export type BaseResponseConstructorArgs<T = null> = {
	data?: T | null;
	message: string;
	status: HTTP_STATUS_CODE;
};
