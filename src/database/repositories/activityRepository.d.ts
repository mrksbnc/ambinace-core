import type {
	TCreateActivityArgs,
	TUpdateActivityArgs,
	TGetActivityByIdArgs,
	THardDeleteActivityArgs,
	TSoftDeleteActivityArgs,
	TGetActivitiesByUserIdArgs,
} from '@/types/args';
import type { Activity } from '@prisma/client';
/**
 * Activity repository interface.
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
