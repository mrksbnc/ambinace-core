import type { Request, Response } from 'express';
import BaseResponse from '@/data/models/baseResponse';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export const routeNotFoundMiddleware = (request: Request, response: Response): void => {
	response.status(HTTP_STATUS_CODE.NOT_FOUND).json(
		new BaseResponse({
			status: HTTP_STATUS_CODE.NOT_FOUND,
			message: RESPONSE_ERROR_MESSAGE.ROUTE_NOT_FOUND,
		}),
	);
};
