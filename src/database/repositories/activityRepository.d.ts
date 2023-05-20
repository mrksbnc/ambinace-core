export declare type TFindActivityByIdArgs = {
	id: number;
};

export declare type TFindSystemWithUserIdsArgs = {
	userId: number;
};

export declare type TFindActivitiesByUserIdArgs = {
	userId: number;
};

export declare type TFindActivitiesByIds = {
	ids: number[];
};

export declare type TCreateActivityArgs = {
	activity: Prisma.ActivityCreateInput;
};

export declare type TUpdateActivityArgs = {
	id: number;
	activity: Prisma.ActivityUpdateInput;
};

export declare type TDeleteActivityArgs = {
	id: number;
};

export declare type TRestoreActivityArgs = {
	id: number;
};

export declare type TActivityRepositoryConstructorArgs = {
	delegate: Prisma.ActivityDelegate<false>;
};

/**
 * Interface definition for ActivityRepository
 */
export declare interface TActivityRepository {
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
