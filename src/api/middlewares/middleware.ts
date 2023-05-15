import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import Log from '@/utils/logger';
import cookieParser from 'cookie-parser';
import AppConfig from '@/config/appConfig';
import BaseError from '@/error/base/baseError';
import type { TMiddleware } from './middleware.d';
import AuthService from '@/services/authService';
import BaseResponse from '@/data/models/baseResponse';
import { API_CONFIG_KEY } from '@/data/constants/config';
import type { TDecodeResult } from '@/services/authService.d';
import type { TRequest, TRequestMethod, TResponse } from '..';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { type Application, type NextFunction, type Request, type Response, urlencoded, json } from 'express';

let sharedInstance: Middleware | null = null;

export default class Middleware implements TMiddleware {
	static get sharedInstance(): Middleware {
		if (sharedInstance === null) {
			sharedInstance = new Middleware();
		}
		return sharedInstance;
	}

	private readonly _contentTypeValidationHandler = (request: Request, response: Response, next: NextFunction): void => {
		if (request.headers['content-type'] === 'application/json') next();
		else
			response.status(HTTP_STATUS_CODE.BAD_REQUEST).json(
				new BaseResponse({
					status: HTTP_STATUS_CODE.BAD_REQUEST,
					message: RESPONSE_ERROR_MESSAGE.INVALID_CONTENT_TYPE,
				}),
			);
	};

	private readonly _httpTrafficLogHandler = morgan(':method :url :status :response-time ms', {
		stream: {
			write: (message) => Log.sharedInstance.baseLogger.http(message.trim()),
		},
	});

	private readonly _requestMethodValidationHandler = (
		request: Request,
		response: Response,
		next: NextFunction,
	): void => {
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
	};

	private readonly _responseHeaderHandler = (request: Request, response: Response, next: NextFunction): void => {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Content-Type', 'application/json');
		response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		next();
	};

	public readonly errorHandler = (
		error: unknown,
		request: Request,
		response: Response,
		next: NextFunction,
	): void | NextFunction => {
		let responseErrorMessage: string = RESPONSE_ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
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
	};

	public readonly authHandler = (request: TRequest, response: TResponse, next: NextFunction): void => {
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
	};

	public readonly routeNotFoundHandler = (request: Request, response: Response): void => {
		response.status(HTTP_STATUS_CODE.NOT_FOUND).json(
			new BaseResponse({
				status: HTTP_STATUS_CODE.NOT_FOUND,
				message: RESPONSE_ERROR_MESSAGE.ROUTE_NOT_FOUND,
			}),
		);
	};

	public register(app: Application): void {
		app.use(this._requestMethodValidationHandler);
		app.use(this._contentTypeValidationHandler);
		app.use(helmet({ hidePoweredBy: true }));
		app.use(hpp());
		app.use(cors());
		app.use(cookieParser());
		app.use(urlencoded({ extended: true }));
		app.use(json({ type: 'application/json' }));
		app.use(this._httpTrafficLogHandler);
		app.all('*', this._responseHeaderHandler);
	}
}
