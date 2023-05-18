import type {
	TDeleteRequestParams,
	TGetByIdRequestParams,
	TRestoreRequestParams,
	TGetByUserIdRequestParams,
} from '../request.d';
import type {
	TCreateMoodRequestDto,
	TUpdateMoodRequestDto,
	TUpdateMoodResponseDto,
	TCreateMoodResponseDto,
	TGetMoodByIdResponseDto,
	TGetMoodsByUserIdResponseDto,
	TGetDefaultMoodsWithUserResponseDto,
} from '../dto.d';
import type { TMoodService } from '@/services/moodService.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';

export type TMoodControllerConstructorArgs = {
	moodService: TMoodService;
};
/**
 * Interface definition for the mood controller.
 */
export interface TMoodController {
	/**
	 * Returns a mood by id or calls the next middleware function
	 * if an error occurs.
	 */
	get(
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetMoodByIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns the moods created by the user with the given id or calls the next middleware function
	 * if an error occurs.
	 */
	getByUserId(
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetMoodsByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns the default and user created moods or calls the next middleware function
	 * if an error occurs.
	 */
	getDefaultAndUserCreatedMoods(
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetDefaultMoodsWithUserResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Creates a mood or calls the next middleware function
	 * if an error occurs.
	 */
	create(
		request: Request<never, never, TCreateMoodRequestDto>,
		response: Response<TBaseResponse<TCreateMoodResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Updates a mood by id or calls the next middleware function
	 * if an error occurs.
	 */
	update(
		request: Request<never, never, TUpdateMoodRequestDto>,
		response: Response<TBaseResponse<TUpdateMoodResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Soft deletes a mood by id or calls the next middleware function
	 * if an error occurs.
	 */
	softDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Restores a soft deleted mood by id or calls the next middleware function
	 * if an error occurs.
	 */
	restore(
		request: Request<TRestoreRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Deletes a mood by id or calls the next middleware function
	 * if an error occurs.
	 */
	hardDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
}
