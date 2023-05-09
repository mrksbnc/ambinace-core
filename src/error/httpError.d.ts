import type { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export type THttpError = {
	status: HTTP_STATUS_CODE;
	message: string;
};
