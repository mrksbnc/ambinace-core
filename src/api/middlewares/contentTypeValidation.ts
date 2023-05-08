import BaseResponse from '@/data/models/baseResponse';
import HTTP_STATUS_CODE from '@/data/enums/httpStatusCode';
import ErrorMessageEnum from '@/data/enums/responseMessage';
import type { NextFunction, Request, Response } from 'express';

export const contentTypeValidationMiddleware = (request: Request, response: Response, next: NextFunction): void => {
	if (request.headers['content-type'] !== 'application/json')
		response.status(HTTP_STATUS_CODE.BAD_REQUEST).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.BAD_REQUEST,
				message: ErrorMessageEnum.INVALID_CONTENT_TYPE,
			}),
		);
	else next();
};
