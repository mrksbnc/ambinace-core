import BaseError from './base/baseError';
import HttpError from './base/httpError';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_MESSAGE, ERROR_NAME, RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';

export default class InvalidArgumentError extends BaseError {
	constructor(key = '') {
		super({
			message: ERROR_MESSAGE.INVALID_ARGUMENT.replace('$', key),
			errorName: ERROR_NAME.INVALID_ARGUMENT,
			httpError: new HttpError({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: RESPONSE_ERROR_MESSAGE.INVALID_ARGUMENT.replace('$', key),
			}),
		});
	}
}
