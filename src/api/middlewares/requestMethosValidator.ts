import AppConfig from '@/config/appConfig';
import BaseResponse from '@/data/models/baseResponse';
import type { TRequestMethod } from '@/config/appConfig.d';
import HTTP_STATUS_CODE from '@/data/enums/httpStatusCode';
import type { NextFunction, Request, Response } from 'express';
import RESPONSE_ERROR_MESSAGE from '@/data/enums/responseMessage';

export const requestMethodValidatorMiddleware = (request: Request, response: Response, next: NextFunction): void => {
	if (AppConfig.instance.enabledRequestMethods.includes(request.method as TRequestMethod)) next();
	else
		response.status(HTTP_STATUS_CODE.METHOD_NOT_ALLOWED).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
				message: RESPONSE_ERROR_MESSAGE.METHOD_NOT_ALLOWED,
			}),
		);
};
