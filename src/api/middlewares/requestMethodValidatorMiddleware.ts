import type { TRequestMethod } from '..';
import AmbianceConfig from '@/config/appConfig';
import BaseResponse from '@/data/models/baseResponse';
import type { NextFunction, Request, Response } from 'express';
import { API_CONFIG_KEY } from '@/data/constants/ambianceConfig';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/responseMessage';

export default function requestMethodValidatorMiddleware(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const enabledHttpRequestMethods = AmbianceConfig.sharedInstance.api[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS];

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
