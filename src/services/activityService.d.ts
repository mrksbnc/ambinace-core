import type { Activity, Prisma } from '@prisma/client';
import type { TActivityRepository } from '../../database/repositories/activityRepository';

export type TGetActivityByIdServiceArgs = {
	id: string;
};

export type TGetAllDefaultWithUserArgs = {
	userId: string;
};

export type TGetManyActivitiesByIdsServiceArgs = {
	ids: string[];
};

export type TGetManyByUserIdServiceArgs = {
	userId: string;
};

export type TCreateActivityServiceArgs = {
	activity: Prisma.ActivityCreateInput;
};

export type TUpdateActivityServiceArgs = {
	id: string;
	activity: Prisma.ActivityUpdateInput;
};

export type TDeleteActivityServiceArgs = {
	id: string;
};

export type TRestoreActivityServiceArgs = {
	id: string;
};

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
	getById({ id }: TGetActivityByIdServiceArgs): Promise<Activity | null>;
	/**
	 * Returns all default and user created activities using the injected repository.
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id.
	 */
	getAllDefaultWithUser({ userId }: TGetAllDefaultWithUserArgs): Promise<Activity[]>;
	/**
	 * Returns a multiple activity by activity ids or empty array if no activities
	 * were found using the injected repository.
	 *
	 * @throws InvalidArgumentError if any of the ids is not a valid numeric id.
	 */
	getManyByIds({ ids }: TGetManyActivitiesByIdsServiceArgs): Promise<Activity[]>;
	/**
	 * Returns a multiple activity by the user id or empty array if no activities
	 * were found using the injected repository.
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id.
	 */
	getManyByUserId({ userId }: TGetManyByUserIdServiceArgs): Promise<Activity[]>;
	/**
	 * Creates a new activity in the database using the injected repository.
	 *
	 * @throws InvalidPayloadError if the activity payload is not valid.
	 */
	create({ activity }: TCreateActivityArgs): Promise<Activity>;
	/**
	 * Updates an existing activity in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 * @throws InvalidPayloadError if the activity payload is not valid.
	 */
	update({ id, activity }: TUpdateActivityArgs): Promise<Activity>;
	/**
	 * Soft deletes an existing activity in the database using the injected repository.
	 * This is the preferred way to delete an activity.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	softDelete({ id }: TDeleteActivityArgs): Promise<void>;
	/**
	 * Restores a soft deleted activity in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	restore({ id }: TRestoreActivityArgs): Promise<void>;
	/**
	 * Permanent deletes an existing activity in the database using the injected repository.
	 * This is not the preferred way to delete an activity.
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	hardDelete({ id }: TDeleteActivityArgs): Promise<void>;
}
