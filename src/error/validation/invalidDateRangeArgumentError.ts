import BaseError from '../baseError';
import HttpError from '../httpError';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export const InvalidDateRangeArgumentError = new BaseError({
	errorName: ERROR_NAME.INVALID_DATE_RANGE_ARGUMENT_ERROR,
	message: ERROR_MESSAGE.INVALID_DATE_RANGE_ARGUMENT,
	httpError: new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.INVALID_DATE_RANGE_ARGUMENT),
});
