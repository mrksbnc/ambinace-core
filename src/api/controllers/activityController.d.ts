import type {
	TCreateActivityRequestDto,
	TUpdateActivityRequestDto,
	TUpdateActivityResponseDto,
	TCreateActivityResponseDto,
	TGetActivityByIdResponseDto,
	TGetDefaultsWithUserRequestDto,
	TGetActivitiesByIdListResponseDto,
	TGetActivitiesByUserIdResponseDto,
	TGetManyActivityByIdListRequestDto,
	TGetDefaultActivitiesWithUserResponseDto,
} from '@/api/dto';
import type {
	TDeleteRequestParams,
	TGetByIdRequestParams,
	TRestoreRequestParams,
	TGetByUserIdRequestParams,
} from '../request';
import type { TBaseResponse } from '@/data/models/baseResponse';
import type { TActivityService } from '@/services/activityService.d';

export declare type TActivityControllerConstructorArgs = {
	activityService: TActivityService;
};
/**
 * Interface definition for the activity controller.
 */
export declare interface TActivityController {
	/**
	 * Returns a single activity or calls the next middleware if activity not exists
	 * in the database
	 */
	get(
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActivityByIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns all default and user created activities or calls the next middleware
	 * if any error occurs.
	 */
	getDefaultsWithUser(
		request: Request<never, never, TGetDefaultsWithUserRequestDto>,
		response: Response<TBaseResponse<TGetDefaultActivitiesWithUserResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a multiple activity by activity ids or calls the next middleware
	 * if any error occurs.
	 */
	getManyByIds(
		request: Request<never, never, TGetManyActivityByIdListRequestDto>,
		response: Response<TBaseResponse<TGetActivitiesByIdListResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a multiple activity by the user id or calls the next middleware
	 * if any error occurs.
	 */
	getManyByUserId(
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActivitiesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Creates a new activity in the database or calls the next middleware
	 * if any error occurs.
	 */
	create(
		request: Request<never, never, TCreateActivityRequestDto>,
		response: Response<TBaseResponse<TCreateActivityResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Updates an existing activity in the database or calls the next middleware
	 * if any error occurs.
	 */
	update(
		request: Request<never, never, TUpdateActivityRequestDto>,
		response: Response<TBaseResponse<TUpdateActivityResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Soft deletes an existing activity in the database or calls the next middleware
	 * if any error occurs.
	 */
	softDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Permanent deletes an existing activity in the database or calls the next middleware
	 * if any error occurs.
	 */
	restore(
		request: Request<TRestoreRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Permanent deletes an existing activity in the database or calls the next middleware
	 * if any error occurs.
	 */
	hardDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
}
