import Log from '@/utils/logger';
import BaseError from '@/error/base/baseError';
import { ERROR_NAME } from '@/data/constants/error';
import BaseResponse from '@/data/models/baseResponse';
import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default function errorHanlder(
	error: unknown,
	request: Request,
	response: Response,
	next: NextFunction,
): void | NextFunction {
	let responseErrorMessage: string = ERROR_NAME.INTERNAL_SERVER_ERROR as string;
	let responseStatusCode: HTTP_STATUS_CODE = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

	if (error instanceof BaseError) {
		responseErrorMessage = error.httpError.message;
		responseStatusCode = error.httpError.status;
	}

	if (response.headersSent) {
		Log.sharedInstance.baseLogger.error('headers already sent');
		return next(error);
	}

	response.status(responseStatusCode);
	response.format({
		'application/json': () => {
			response.json(
				new BaseResponse({
					status: responseStatusCode,
					message: responseErrorMessage,
				}),
			);
		},
		default: () => {
			response.type('text/plain').send(responseErrorMessage);
		},
	});

	Log.sharedInstance.baseLogger.error(error);
	next();
}
