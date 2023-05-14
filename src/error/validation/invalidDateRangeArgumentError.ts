import BaseError from '../base/baseError';
import HttpError from '../base/httpError';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default class InvalidDateRangeArgumentError extends BaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.INVALID_DATE_RANGE_ARGUMENT,
			errorName: ERROR_NAME.INVALID_ARGUMENT_ERROR,
			httpError: new HttpError({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: ERROR_MESSAGE.INVALID_DATE_RANGE_ARGUMENT,
			}),
		});
	}
}
