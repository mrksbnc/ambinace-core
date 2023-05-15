export type TFindActivityByIdArgs = {
	id: number;
};

export type TFindSystemWithUserIdsArgs = {
	userId: number;
};

export type TFindActivitiesByUserIdArgs = {
	userId: number;
};

export type TFindActivitiesByIds = {
	ids: number[];
};

export type TCreateActivityArgs = {
	activity: Prisma.ActivityCreateInput;
};

export type TUpdateActivityArgs = {
	id: number;
	activity: Prisma.ActivityUpdateInput;
};

export type TDeleteActivityArgs = {
	id: number;
};

export type TRestoreActivityArgs = {
	id: number;
};

export type TActivityRepositoryConstructorArgs = {
	delegate: Prisma.ActivityDelegate<false>;
};

/**
 * Interface definition for ActivityRepository
 */
export interface TActivityRepository {
	/**
	 * Returns a single activity by id or null if activity not found
	 */
	findById({ id }: TFindActivityByIdArgs): Promise<Activity | null>;
	/**
	 * Retruns all default activities
	 */
	findAllDefaultWithUser({ userId }: TFindSystemWithUserIdsArgs): Promise<Activity[]>;
	/**
	 * Returns a multiple activity by activity ids or empty array if no activities
	 * were found
	 */
	findManyByIds({ ids }: TFindActivitiesByIds): Promise<Activity[]>;
	/**
	 * Returns a multiple activity by the user id or empty array if no activities
	 * were found
	 */
	findManyByUserId({ userId }: TFindActivitiesByUserIdArgs): Promise<Activity[]>;
	/**
	 * Creates a new activity
	 */
	create({ activity }: TCreateActivityArgs): Promise<Activity>;
	/**
	 * Updates an existing activity
	 */
	update({ id, activity }: TUpdateActivityArgs): Promise<Activity>;
	/**
	 * Soft deletes an existing activity
	 */
	softDelete({ id }: TDeleteActivityArgs): Promise<void>;
	/**
	 * Restores a soft deleted activity
	 */
	restore({ id }: TRestoreActivityArgs): Promise<Activity>;
	/**
	 * Permanently deletes an existing activity
	 */
	hardDelete({ id }: TDeleteActivityArgs): Promise<void>;
}
