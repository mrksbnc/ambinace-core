import type {
	TGetUserResponseDto,
	TUpdateUserRequestDto,
	TUpdateUserResponseDto,
	TGetManyByIdsRequestDto,
	TGetManyUserByIdsResponseDto,
	TGetUserRequestDto,
} from '../dto';
import HttpError from '@/error/base/httpError';
import BaseError from '@/error/base/baseError';
import UserService from '@/services/userService';
import BaseResponse from '@/data/models/baseResponse';
import type { TUserService } from '@/services/userService.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import type { TDeleteRequestParams, TGetByIdRequestParams } from '../request';
import type { TUserController, TUserControllerConstructorArgs } from './userController.d';
import { ERROR_MESSAGE, ERROR_NAME, RESPONSE_ERROR_MESSAGE } from '@/data/constants/error';

let sharedInstance: UserController | null = null;

export default class UserController implements TUserController {
	private readonly _userService: TUserService;

	public constructor({ userService }: TUserControllerConstructorArgs) {
		this._userService = userService;
	}

	static get sharedInstance(): UserController {
		if (!sharedInstance) {
			sharedInstance = new UserController({
				userService: UserService.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public get = async (
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetUserResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TGetUserRequestDto = {
				id: request.params.id,
			};

			const data: TGetUserResponseDto = await this._userService.getById(requestDto);

			if (data.user === null) {
				next(
					new BaseError({
						message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
						errorName: ERROR_NAME.RESOURCE_NOT_FOUND,
						httpError: new HttpError({
							status: HTTP_STATUS_CODE.NOT_FOUND,
							message: RESPONSE_ERROR_MESSAGE.RESOURCE_NOT_FOUND,
						}),
					}),
				);
			}

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetUserResponseDto>({
					data,
					status: HTTP_STATUS_CODE.OK,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getMany = async (
		request: Request<never, never, TGetManyByIdsRequestDto>,
		response: Response<TBaseResponse<TGetManyUserByIdsResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TGetManyByIdsRequestDto = {
				ids: request.body.ids,
			};

			const data: TGetManyUserByIdsResponseDto = await this._userService.getManyByIds(requestDto);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetManyUserByIdsResponseDto>({
					data,
					status: HTTP_STATUS_CODE.OK,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public update = async (
		request: Request<never, never, TUpdateUserRequestDto>,
		response: Response<TBaseResponse<TUpdateUserResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TUpdateUserRequestDto = {
				id: request.body.id,
				user: request.body.user,
			};

			const data: TUpdateUserResponseDto = await this._userService.update(requestDto);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TUpdateUserResponseDto>({
					data,
					status: HTTP_STATUS_CODE.OK,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public softDelete = async (
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TDeleteRequestParams = {
				id: request.params.id,
			};

			await this._userService.softDelete(requestDto);

			response.status(HTTP_STATUS_CODE.NO_CONTENT).json(
				new BaseResponse<never>({
					status: HTTP_STATUS_CODE.NO_CONTENT,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public restore = async (
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TDeleteRequestParams = {
				id: request.params.id,
			};

			await this._userService.restore(requestDto);

			response.status(HTTP_STATUS_CODE.NO_CONTENT).json(
				new BaseResponse<never>({
					status: HTTP_STATUS_CODE.NO_CONTENT,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public hardDelete = async (
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TDeleteRequestParams = {
				id: request.params.id,
			};

			await this._userService.hardDelete(requestDto);

			response.status(HTTP_STATUS_CODE.NO_CONTENT).json(
				new BaseResponse<never>({
					status: HTTP_STATUS_CODE.NO_CONTENT,
				}),
			);
		} catch (error) {
			next(error);
		}
	};
}
