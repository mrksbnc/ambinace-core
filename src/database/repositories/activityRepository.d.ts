import type { Activity } from '@prisma/client';

export type TActivityRepository = {
	getActivities: () => Promise<Activity[]>;
	getActiveActivities: () => Promise<Activity[]>;
	getActivitiesByUserId: (userId: number) => Promise<Activity[]>;
	getActivityById: (id: number) => Promise<Activity | null>;
	createActivity: (activity: Activity) => Promise<Activity>;
	updateActivity: (activity: Activity) => Promise<Activity>;
	softDeleteActivity: (id: number) => Promise<void>;
	hardDeleteActivity: (id: number) => Promise<void>;
};
