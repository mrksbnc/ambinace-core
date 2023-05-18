import type { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export declare type THttpError = {
	status: HTTP_STATUS_CODE;
	message: string;
};

export declare type THttpErrorConstructorArgs = {
	status: HTTP_STATUS_CODE;
	message: string;
};
