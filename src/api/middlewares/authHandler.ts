import type { NextFunction } from 'express';
import type { TRequest, TResponse } from '..';
import AuthService from '@/services/authService';
import BaseResponse from '@/data/models/baseResponse';
import type { TDecodeResult } from '@/services/authService.d';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

export default function authHandler(request: TRequest, response: TResponse, next: NextFunction): void {
	const token: string | undefined = request.headers.authorization?.split(' ')[1];

	if (!token) {
		response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.UNAUTHORIZED,
				message: RESPONSE_ERROR_MESSAGE.MISSING_AUTHORIZATION_HEADER,
			}),
		);
		return;
	}

	try {
		const decoded: TDecodeResult = AuthService.sharedInstance.decodeSession({ token });

		if (decoded.type === 'invalid-token') {
			response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json(
				new BaseResponse({
					status: HTTP_STATUS_CODE.UNAUTHORIZED,
					message: RESPONSE_ERROR_MESSAGE.UNAUTHORIZED,
				}),
			);
			return;
		}

		if (decoded.type === 'expired') {
			/**
			 * In case of expired token, we need to check if the token is in grace period.
			 * If it is, we will send a new token in the response header for the frontend to
			 * in later requests.
			 */
			const exparationStatus = AuthService.sharedInstance.checkExpirationStatus({
				session: decoded.session,
			});

			if (exparationStatus === 'expired') {
				response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json(
					new BaseResponse({
						status: HTTP_STATUS_CODE.UNAUTHORIZED,
						message: RESPONSE_ERROR_MESSAGE.UNAUTHORIZED,
					}),
				);
				return;
			}

			if (exparationStatus === 'grace') {
				const newToken = AuthService.sharedInstance.encodeSession({
					userId: decoded.session.userId,
				});
				response.setHeader('Authorization', `Bearer ${newToken}`);
			}
		}

		/**
		 * userId is required in most of the cases, so it will get provided through the
		 * response.locals object.
		 */
		response.locals.session = decoded.session;
		next();
	} catch (error) {
		response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.UNAUTHORIZED,
				message: RESPONSE_ERROR_MESSAGE.UNAUTHORIZED,
			}),
		);
	}
}
