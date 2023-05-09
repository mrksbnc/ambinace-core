import BaseResponse from '@/data/models/baseResponse';
import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/responseMessage';

export const contentTypeValidationMiddleware = (request: Request, response: Response, next: NextFunction): void => {
	if (request.headers['content-type'] !== 'application/json')
		response.status(HTTP_STATUS_CODE.BAD_REQUEST).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: RESPONSE_ERROR_MESSAGE.INVALID_CONTENT_TYPE,
			}),
		);
	else next();
};
