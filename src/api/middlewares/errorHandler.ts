import { logger } from '@/utils/logger';
import BaseError from '@/error/baseError';
import { ERROR_NAME } from '@/data/constants/errorName';
import BaseResponse from '@/data/models/baseResponse';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import type { NextFunction, Request, Response } from 'express';

export const errorHandlerMiddleware = (
	error: unknown,
	request: Request,
	response: Response,
	next: NextFunction,
): void | NextFunction => {
	let responseErrorMessage: string = ERROR_NAME.INTERNAL_SERVER_ERROR as string;
	let responseStatusCode: HTTP_STATUS_CODE = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

	if (error instanceof BaseError) {
		responseErrorMessage = error.message;
		responseStatusCode = error.httpError.status;
	}

	if (error instanceof BaseError && error.httpError) {
		responseStatusCode = error.httpError.status;
		responseErrorMessage = error.httpError.message;
	}

	if (response.headersSent) {
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

	const _e = error as Error;
	logger.error(_e.message, '\r\n', error);
	next();
};
