import type { TRequestMethod } from '..';
import AppConfig from '@/config/appConfig';
import BaseResponse from '@/data/models/baseResponse';
import { API_CONFIG_KEY } from '@/data/constants/config';
import type { NextFunction, Request, Response } from 'express';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default function requestMethodValidator(request: Request, response: Response, next: NextFunction): void {
	const enabledHttpRequestMethods = AppConfig.sharedInstance.api[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS];

	if (enabledHttpRequestMethods !== undefined && enabledHttpRequestMethods.includes(request.method as TRequestMethod))
		next();
	else
		response.status(HTTP_STATUS_CODE.METHOD_NOT_ALLOWED).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
				message: RESPONSE_ERROR_MESSAGE.METHOD_NOT_ALLOWED,
			}),
		);
}
