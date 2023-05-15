import BaseError from './base/baseError';
import HttpError from './base/httpError';
import type { TBaseError } from './base/baseError.d';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_MESSAGE, ERROR_NAME, RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';

export default class InvalidDateRangeArgumentError extends BaseError implements TBaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.INVALID_DATE_RANGE_ARGUMENT,
			errorName: ERROR_NAME.INVALID_DATE_RANGE_ARGUMENT,
			httpError: new HttpError({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: RESPONSE_ERROR_MESSAGE.INVALID_DATE_RANGE_ARGUMENT,
			}),
		});
	}
}
