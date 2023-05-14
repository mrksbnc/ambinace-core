import BaseError from './base/baseError';
import HttpError from './base/httpError';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/responseMessage';

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
