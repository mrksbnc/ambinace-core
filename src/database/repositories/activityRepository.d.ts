import type { Activity } from '@prisma/client';
/**
 * Arguments for getActivitiesByUserId.
 */
export type TGetActivitiesByUserIdArgs = {
	userId: number;
};
/**
 * Arguments for getActivityById.
 */
export type TGetActivityByIdArgs = {
	id: number;
};
/**
 * Arguments for createActivity.
 */
export type TCreateActivityArgs = {
	activity: Activity;
};
/**
 * Arguments for updateActivity.
 */
export type TUpdateActivityArgs = {
	id: number;
	activity: Activity;
};
/**
 * Arguments for softDeleteActivity.
 */
export type TSoftDeleteActivityArgs = {
	id: number;
};
/**
 * Arguments for hardDeleteActivity.
 */
export type THardDeleteActivityArgs = {
	id: number;
};
/**
 * Activity repository interface.
 * @remarks
 * This is a repository interface, which means that it is an abstraction over the database.
 * @see ActivityRepository
 */
export type TActivityRepository = {
	/**
	 * Returns all activities.
	 */
	getActivities: () => Promise<Activity[]>;
	/**
	 * Returns all active activities.
	 */
	getActiveActivities: () => Promise<Activity[]>;
	/**
	 * Returns all activities created by a user.
	 */
	getActivitiesByUserId: (args: TGetActivitiesByUserIdArgs) => Promise<Activity[]>;
	/**
	 * Returns an activity by its id.
	 */
	getActivityById: (args: TGetActivityByIdArgs) => Promise<Activity | null>;
	/**
	 * Creates an activity.
	 */
	createActivity: (args: TCreateActivityArgs) => Promise<Activity>;
	/**
	 * Updates an activity.
	 */
	updateActivity: (args: TUpdateActivityArgs) => Promise<Activity>;
	/**
	 * Soft deletes an activity.
	 * @remarks
	 * This is the recommended way to delete an activity.
	 */
	softDeleteActivity: (args: TSoftDeleteActivityArgs) => Promise<void>;
	/**
	 * Hard-deletes an activity.
	 * @remarks
	 * This is not recommended, use softDeleteEntry instead.
	 * @see softDeleteActivity
	 */
	hardDeleteActivity: (args: THardDeleteActivityArgs) => Promise<void>;
};
