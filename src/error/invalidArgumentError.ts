import BaseError from './baseError';
import HttpError from './httpError';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default class InvalidArgumentError extends BaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.INVALID_ARGUMENT,
			errorName: ERROR_NAME.INVALID_ARGUMENT_ERROR,
			httpError: new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.INVALID_ARGUMENT),
		});
	}
}
