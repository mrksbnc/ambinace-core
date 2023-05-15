import type {
	TAuthController,
	TLoginRequestBody,
	TRegisterRequestBody,
	TRegisterResponseBody,
	TAuthControllerConstructorArgs,
} from './authController.d';
import type { NextFunction } from 'express';
import type { TRequest, TResponse } from '..';
import AuthService from '@/services/authService';
import UserService from '@/services/userService';
import BaseResponse from '@/data/models/baseResponse';
import type { TAuthService } from '@/services/authService.d';
import type { TLoginResponseBody } from './authController.d';
import type { TUserService } from '@/services/userService.d';
import type { TEncodeResult } from '@/services/authService.d';
import { RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import type { TPartialUser } from '@/database/repositories/userRepository.d';

let sharedInstance: AuthController | null = null;

export default class AuthController implements TAuthController {
	private readonly _authService: TAuthService;
	private readonly _userService: TUserService;

	static get sharedInstance(): AuthController {
		if (sharedInstance === null) {
			sharedInstance = new AuthController({
				authService: AuthService.sharedInstance,
				userService: UserService.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public constructor({ authService, userService }: TAuthControllerConstructorArgs) {
		this._authService = authService;
		this._userService = userService;
	}

	public register = async (
		request: TRequest<never, never, TRegisterRequestBody>,
		response: TResponse,
		next: NextFunction,
	): Promise<void> => {
		try {
			const body: TRegisterRequestBody = request.body;
			const user: TPartialUser = await this._authService.register({ user: body.user });
			const encodedSession: TEncodeResult = this._authService.encodeSession({ userId: user.id });

			const data: TRegisterResponseBody = {
				user,
				token: encodedSession.accessToken,
			};

			response.status(HTTP_STATUS_CODE.CREATED).json(
				new BaseResponse<TRegisterResponseBody>({
					status: HTTP_STATUS_CODE.CREATED,
					data,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public login = async (
		request: TRequest<never, never, TLoginRequestBody>,
		response: TResponse<TLoginResponseBody>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { email, password }: TLoginRequestBody = request.body;

			const encodedSession: TEncodeResult = await this._authService.authenticate({ email, password });
			const user = await this._userService.getById({ id: `${encodedSession.userId}` });

			if (user === null) {
				response.status(HTTP_STATUS_CODE.NOT_FOUND).json(
					new BaseResponse({
						status: HTTP_STATUS_CODE.NOT_FOUND,
						message: RESPONSE_ERROR_MESSAGE.RESOURCE_NOT_FOUND,
					}),
				);

				return next();
			}

			const data: TLoginResponseBody = {
				user,
				token: encodedSession.accessToken,
			};

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse({
					status: HTTP_STATUS_CODE.OK,
					data,
				}),
			);
		} catch (error) {
			next(error);
		}
	};
}
