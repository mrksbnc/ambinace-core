import type {
	TDeleteRequestParams,
	TRestoreRequestParams,
	TGetByIdRequestParams,
	TGetByUserIdRequestParams,
} from '../request';
import type {
	TCreateMoodRequestDto,
	TUpdateMoodRequestDto,
	TUpdateMoodResponseDto,
	TCreateMoodResponseDto,
	TGetMoodByIdRequestDto,
	TGetMoodByIdResponseDto,
	TGetMoodsByUserIdResponseDto,
	TGetDefaultMoodsWithUserResponseDto,
} from '../dto.d';
import HttpError from '@/error/base/httpError';
import BaseError from '@/error/base/baseError';
import MoodService from '@/services/moodService';
import BaseResponse from '@/data/models/baseResponse';
import type { TMoodService } from '@/services/moodService.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import type { TMoodController, TMoodControllerConstructorArgs } from './moodController.d';

let sharedInstance: TMoodController | null = null;

export default class MoodController implements TMoodController {
	private readonly _moodService: TMoodService;

	static get sharedInstance(): TMoodController {
		if (sharedInstance === null) {
			sharedInstance = new MoodController({
				moodService: MoodService.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public constructor({ moodService }: TMoodControllerConstructorArgs) {
		this._moodService = moodService;
	}

	public get = async (
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetMoodByIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TGetMoodByIdRequestDto = {
				id: request.params.id,
			};

			const dto: TGetMoodByIdResponseDto = await this._moodService.getById(requestDto);

			if (dto.mood === null) {
				return next(
					new BaseError({
						message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
						errorName: ERROR_NAME.RESOURCE_NOT_FOUND,
						httpError: new HttpError({
							status: HTTP_STATUS_CODE.BAD_REQUEST,
							message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
						}),
					}),
				);
			}

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getByUserId = async (
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetMoodsByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TGetByUserIdRequestParams = {
				userId: request.params.userId,
			};

			const dto: TGetMoodsByUserIdResponseDto = await this._moodService.getByUserId(requestDto);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetMoodsByUserIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getDefaultAndUserCreatedMoods = async (
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetDefaultMoodsWithUserResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TGetByUserIdRequestParams = {
				userId: request.params.userId,
			};

			const dto: TGetDefaultMoodsWithUserResponseDto = await this._moodService.getDefaultsWithUser(requestDto);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetDefaultMoodsWithUserResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public create = async (
		request: Request<never, never, TCreateMoodRequestDto>,
		response: Response<TBaseResponse<TCreateMoodResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TCreateMoodRequestDto = {
				mood: request.body.mood,
			};

			const dto: TCreateMoodResponseDto = await this._moodService.create(requestDto);

			response.status(HTTP_STATUS_CODE.CREATED).json(
				new BaseResponse<TCreateMoodResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public update = async (
		request: Request<never, never, TUpdateMoodRequestDto>,
		response: Response<TBaseResponse<TUpdateMoodResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TUpdateMoodRequestDto = {
				id: request.body.id,
				mood: request.body.mood,
			};

			const dto: TUpdateMoodResponseDto = await this._moodService.update(requestDto);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TUpdateMoodResponseDto>({
					data: dto,
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

			await this._moodService.softDelete(requestDto);
		} catch (error) {
			next(error);
		}
	};

	public restore = async (
		request: Request<TRestoreRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestDto: TRestoreRequestParams = {
				id: request.params.id,
			};

			await this._moodService.restore(requestDto);
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

			await this._moodService.hardDelete(requestDto);
		} catch (error) {
			next(error);
		}
	};
}
