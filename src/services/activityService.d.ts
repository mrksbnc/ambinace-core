import type {
	TCreateActivityRequestDto,
	TDeleteActivityRequestDto,
	TUpdateActivityRequestDto,
	TUpdateActivityResponseDto,
	TGetActivityByIdRequestDto,
	TCreateActivityResponseDto,
	TGetActivityByIdResponseDto,
	TGetDefaultsWithUserRequestDto,
	TGetActivitiesByUserIdRequestDto,
	TGetActivitiesByIdListResponseDto,
	TGetActivitiesByUserIdResponseDto,
	TGetManyActivityByIdListRequestDto,
	TGetDefaultActivitiesWithUserResponseDto,
} from '@/api/dto';
import type { TActivityRepository } from '../../database/repositories/activityRepository';

export type TActivityServiceConstructorArgs = {
	activityRepository: TActivityRepository;
};
/**
 * Interface definition for the activity service.
 */
export interface TActivityService {
	/**
	 * Returns a single activity or null if activity not exists in the database
	 * using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	getById({ id }: TGetActivityByIdRequestDto): Promise<TGetActivityByIdResponseDto>;
	/**
	 * Returns all default and user created activities using the injected repository.
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id.
	 */
	getDefaultsWithUser({ userId }: TGetDefaultsWithUserRequestDto): Promise<TGetDefaultActivitiesWithUserResponseDto>;
	/**
	 * Returns a multiple activity by activity ids or empty array if no activities
	 * were found using the injected repository.
	 *
	 * @throws InvalidArgumentError if any of the ids is not a valid numeric id.
	 */
	getManyByIds({ ids }: TGetManyActivityByIdListRequestDto): Promise<TGetActivitiesByIdListResponseDto>;
	/**
	 * Returns a multiple activity by the user id or empty array if no activities
	 * were found using the injected repository.
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id.
	 */
	getManyByUserId({ userId }: TGetActivitiesByUserIdRequestDto): Promise<TGetActivitiesByUserIdResponseDto>;
	/**
	 * Creates a new activity in the database using the injected repository.
	 *
	 * @throws InvalidPayloadError if the activity payload is not valid.
	 */
	create({ activity }: TCreateActivityRequestDto): Promise<TCreateActivityResponseDto>;
	/**
	 * Updates an existing activity in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 * @throws InvalidPayloadError if the activity payload is not valid.
	 */
	update({ id, activity }: TUpdateActivityRequestDto): Promise<TUpdateActivityResponseDto>;
	/**
	 * Soft deletes an existing activity in the database using the injected repository.
	 * This is the preferred way to delete an activity.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	softDelete({ id }: TDeleteActivityRequestDto): Promise<void>;
	/**
	 * Restores a soft deleted activity in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	restore({ id }: TRestoreActivityRequestDto): Promise<void>;
	/**
	 * Permanent deletes an existing activity in the database using the injected repository.
	 * This is not the preferred way to delete an activity.
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	hardDelete({ id }: TDeleteActivityRequestDto): Promise<void>;
}
