import type {
	TDeleteRequestParams,
	TGetByIdRequestParams,
	TRestoreRequestParams,
	TGetByUserIdRequestParams,
} from '../request';
import type {
	TUpdateEntryRequestDto,
	TCreateEntryRequestDto,
	TUpdateEntryResponseDto,
	TCreateEntryResponseDto,
	TGetEntryByIdResponseDto,
	TGetEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndMoodRequestDto,
	TGetActiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndDateRequestDto,
	TGetEntriesByUserIdAndMoodResponseDto,
	TGetEntriesByUserIdAndDateResponseDto,
	TGetEntriesByUserIdAndDateRangeRequestDto,
	TGetEntriesByUserIdAndDateRangeResponseDto,
} from '../dto';
import BaseError from '@/error/base/baseError';
import HttpError from '@/error/base/httpError';
import EntryService from '@/services/entryService';
import BaseResponse from '@/data/models/baseResponse';
import type { TEntryService } from '@/services/entryService.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { ERROR_MESSAGE, ERROR_NAME } from '@/data/constants/error';
import type { TEntryController, TEntryControllerConstructorArgs } from './entryController.d';

let sharedInstance: EntryController | null = null;

export default class EntryController implements TEntryController {
	private readonly _entryService: TEntryService;

	public static get sharedInstance(): EntryController {
		if (sharedInstance === null) {
			sharedInstance = new EntryController({
				service: EntryService.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ service }: TEntryControllerConstructorArgs) {
		this._entryService = service;
	}

	public get = async (
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetEntryByIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto = await this._entryService.getById(request.params);

			if (dto.entry === null) {
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
				new BaseResponse<TGetEntryByIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getByUserId = async (
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetEntriesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetEntriesByUserIdResponseDto = await this._entryService.getByUserId(request.params);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetEntriesByUserIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getByUserIdAndDate = async (
		request: Request<never, never, TGetEntriesByUserIdAndDateRequestDto>,
		response: Response<TBaseResponse<TGetEntriesByUserIdAndDateResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetEntriesByUserIdAndDateResponseDto = await this._entryService.getByUserIdAndDate(request.body);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetEntriesByUserIdAndDateResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getByUserIdAndDateRange = async (
		request: Request<never, never, TGetEntriesByUserIdAndDateRangeRequestDto>,
		response: Response<TBaseResponse<TGetEntriesByUserIdAndDateRangeResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetEntriesByUserIdAndDateRangeResponseDto = await this._entryService.getByUserIdAndDateRange(
				request.body,
			);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetEntriesByUserIdAndDateRangeResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getByUserIdAndMood = async (
		request: Request<never, never, TGetEntriesByUserIdAndMoodRequestDto>,
		response: Response<TBaseResponse<TGetEntriesByUserIdAndMoodResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetEntriesByUserIdAndMoodResponseDto = await this._entryService.getByUserIdAndMood(request.body);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetEntriesByUserIdAndMoodResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getActiveByUserId = async (
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActiveEntriesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetActiveEntriesByUserIdResponseDto = await this._entryService.getActiveByUserId(request.params);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetActiveEntriesByUserIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public getInactiveByUserId = async (
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActiveEntriesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TGetActiveEntriesByUserIdResponseDto = await this._entryService.getActiveByUserId(request.params);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TGetActiveEntriesByUserIdResponseDto>({
					data: dto,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public create = async (
		request: Request<never, never, TCreateEntryRequestDto>,
		response: Response<TBaseResponse<TCreateEntryResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TCreateEntryResponseDto = await this._entryService.create(request.body);

			response.status(HTTP_STATUS_CODE.CREATED).json(
				new BaseResponse<TCreateEntryResponseDto>({
					data: dto,
					status: HTTP_STATUS_CODE.CREATED,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	public update = async (
		request: Request<never, never, TUpdateEntryRequestDto>,
		response: Response<TBaseResponse<TUpdateEntryResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			const dto: TUpdateEntryResponseDto = await this._entryService.update(request.body);

			response.status(HTTP_STATUS_CODE.OK).json(
				new BaseResponse<TUpdateEntryResponseDto>({
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
			await this._entryService.softDelete(request.params);

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
			await this._entryService.softDelete(request.params);

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
			await this._entryService.hardDelete(request.params);

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
