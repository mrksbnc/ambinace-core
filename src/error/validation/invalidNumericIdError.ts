import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import BaseError from '../baseError';
import HttpError from '../httpError';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export const InvalidNumericArgumentError = new BaseError({
	errorName: ERROR_NAME.INVALID_ARGUMENT_ERROR,
	message: ERROR_MESSAGE.INVALID_NUMERIC_ID,
	httpError: new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.INVALID_NUMERIC_ID),
});
