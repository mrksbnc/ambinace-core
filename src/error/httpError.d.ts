import type { HTTP_STATUS_CODE } from '@/data/enums/httpStatusCode';

export type THttpError = {
	status: HTTP_STATUS_CODE;
	message: string;
};
