import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/responseMessage';
import BaseError from './base/baseError';
import HttpError from './base/httpError';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default class InvalidEmailError extends BaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.INVALID_EMAIL_ARGUMENT,
			errorName: ERROR_NAME.INVALID_EMAIL_ARGUMENT,
			httpError: new HttpError({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: RESPONSE_ERROR_MESSAGE.INVALID_EMAIL_ARGUMENT,
			}),
		});
	}
}
