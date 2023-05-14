import BaseError from './base/baseError';
import HttpError from './base/httpError';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/responseMessage';

export default class InvalidPayloadError extends BaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.INVALID_PAYLOAD,
			errorName: ERROR_NAME.INVALID_PAYLOAD,
			httpError: new HttpError({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: RESPONSE_ERROR_MESSAGE.INVALID_PAYLOAD,
			}),
		});
	}
}
