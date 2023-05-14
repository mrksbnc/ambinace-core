import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import BaseError from './base/baseError';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default class ResourceNotFoundError extends BaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
			errorName: ERROR_NAME.RESOURCE_NOT_FOUND_ERROR,
			httpError: {
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
			},
		});
	}
}
