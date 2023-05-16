import type { TLocals } from '..';
import BaseError from '@/error/base/baseError';
import HttpError from '@/error/base/httpError';
import AuthService from '@/services/authService';
import BaseResponse from '@/data/models/baseResponse';
import type { TAuthService } from '@/services/authService.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_NAME, RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';
import type { TAuthController, TAuthControllerConstructorArgs } from './authController.d';
import type { TLoginRequestDto, TLoginResponseDto, TRegisterRequestDto, TRegisterResponseDto } from '../dto';

let sharedInstance: AuthController | null = null;

export default class AuthController implements TAuthController {
	private readonly _authService: TAuthService;

	static get sharedInstance(): AuthController {
		if (sharedInstance === null) {
			sharedInstance = new AuthController({
				authService: AuthService.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public constructor({ authService }: TAuthControllerConstructorArgs) {
		this._authService = authService;
	}

	public register = async (
		request: Request<never, never, TRegisterRequestDto>,
		response: Response<TBaseResponse<TRegisterResponseDto>, TLocals>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TRegisterRequestDto = request.body;
			const data: TRegisterResponseDto = await this._authService.register({
				user: requestDto.user,
			});

			response.status(HTTP_STATUS_CODE.CREATED).json(
				new BaseResponse<TRegisterResponseDto>({
					status: HTTP_STATUS_CODE.CREATED,
					data,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public login = async (
		request: Request<never, never, TLoginRequestDto>,
		response: Response<BaseResponse<TLoginResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { email, password }: TLoginRequestDto = request.body;

			const data: TLoginResponseDto = await this._authService.authenticate({
				email,
				password,
			});

			if (data.user === null) {
				return next(
					new BaseError({
						errorName: ERROR_NAME.INVALID_CREDENTIALS,
						message: RESPONSE_ERROR_MESSAGE.INVALID_CREDENTIALS,
						httpError: new HttpError({
							status: HTTP_STATUS_CODE.UNAUTHORIZED,
							message: RESPONSE_ERROR_MESSAGE.INVALID_CREDENTIALS,
						}),
					}),
				);
			}

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TLoginResponseDto>({
					status: HTTP_STATUS_CODE.OK,
					data,
				}),
			);
		} catch (error) {
			next(error);
		}
	};
}
