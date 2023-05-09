import type { Request, Response } from 'express';
import BaseResponse from '@/data/models/baseResponse';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/responseMessage';

export const notFoundHandlerMiddleware = (request: Request, response: Response): void => {
	response.status(HTTP_STATUS_CODE.NOT_FOUND).json(
		new BaseResponse({
			status: HTTP_STATUS_CODE.NOT_FOUND,
			message: RESPONSE_ERROR_MESSAGE.ROUTE_NOT_FOUND,
		}),
	);
};
