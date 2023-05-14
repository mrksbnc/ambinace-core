import BaseError from '../baseError';
import HttpError from '../httpError';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';

export const InvalidDateArgumentError = new BaseError({
	errorName: ERROR_NAME.INVALID_ARGUMENT_ERROR,
	message: ERROR_MESSAGE.INVALID_DATE,
	httpError: new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.INVALID_DATE),
});
