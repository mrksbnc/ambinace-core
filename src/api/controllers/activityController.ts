import type {
	TDeleteRequestParams,
	TRestoreRequestParams,
	TGetByIdRequestParams,
	TGetByUserIdRequestParams,
} from '../request';
import type {
	TCreateActivityRequestDto,
	TUpdateActivityRequestDto,
	TCreateActivityResponseDto,
	TUpdateActivityResponseDto,
	TGetActivityByIdResponseDto,
	TGetDefaultsWithUserRequestDto,
	TGetActivitiesByIdListResponseDto,
	TGetActivitiesByUserIdResponseDto,
	TGetManyActivityByIdListRequestDto,
	TGetDefaultActivitiesWithUserResponseDto,
} from '../dto';
import BaseError from '@/error/base/baseError';
import HttpError from '@/error/base/httpError';
import BaseResponse from '@/data/models/baseResponse';
import ActivityService from '@/services/activityService';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import type { TActivityService } from '@/services/activityService.d';
import type { TActivityController, TActivityControllerConstructorArgs } from '@/api/controllers/activityController.d';

let sharedInstance: ActivityController | null = null;

export default class ActivityController implements TActivityController {
	private readonly _activityService: TActivityService;

	public static get sharedInstance(): ActivityController {
		if (sharedInstance === null) {
			sharedInstance = new ActivityController({
				activityService: ActivityService.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ activityService }: TActivityControllerConstructorArgs) {
		this._activityService = activityService;
	}

	public get = async (
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActivityByIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetActivityByIdResponseDto = await this._activityService.getById(request.params);

			if (dto.activity === null) {
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
				new BaseResponse<TGetActivityByIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getDefaultsWithUser = async (
		request: Request<never, never, TGetDefaultsWithUserRequestDto>,
		response: Response<TBaseResponse<TGetDefaultActivitiesWithUserResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetDefaultActivitiesWithUserResponseDto = await this._activityService.getDefaultsWithUser(
				request.body,
			);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetDefaultActivitiesWithUserResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getManyByIds = async (
		request: Request<never, never, TGetManyActivityByIdListRequestDto>,
		response: Response<TBaseResponse<TGetActivitiesByIdListResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetActivitiesByIdListResponseDto = await this._activityService.getManyByIds(request.body);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetActivitiesByIdListResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getManyByUserId = async (
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActivitiesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetActivitiesByUserIdResponseDto = await this._activityService.getManyByUserId(request.params);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetActivitiesByUserIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public create = async (
		request: Request<never, never, TCreateActivityRequestDto>,
		response: Response<TBaseResponse<TCreateActivityResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TCreateActivityResponseDto = await this._activityService.create(request.body);

			response.status(HTTP_STATUS_CODE.CREATED).json(
				new BaseResponse<TCreateActivityResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public update = async (
		request: Request<never, never, TUpdateActivityRequestDto>,
		response: Response<TBaseResponse<TUpdateActivityResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TUpdateActivityResponseDto = await this._activityService.update(request.body);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TUpdateActivityResponseDto>({
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
			await this._activityService.softDelete(request.params);

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
		request: Request<TRestoreRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			await this._activityService.restore(request.params);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<never>({
					status: HTTP_STATUS_CODE.OK,
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
			await this._activityService.softDelete(request.params);

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
