import BaseError from './base/baseError';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default class ResourceNotFoundError extends BaseError {
	constructor() {
		super({
			message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
			errorName: ERROR_NAME.RESOURCE_NOT_FOUND,
			httpError: {
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
			},
		});
	}
}
