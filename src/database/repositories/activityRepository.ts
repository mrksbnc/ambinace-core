import type {
	TCreateActivityArgs,
	TUpdateActivityArgs,
	TGetActivityByIdArgs,
	THardDeleteActivityArgs,
	TSoftDeleteActivityArgs,
	TGetActivitiesByUserIdArgs,
} from '../../types/args.d';
import Database from '../database';
import BaseRepository from './baseRepository';
import type { Activity, Prisma } from '@prisma/client';
import type { TActivityRepository } from './activityRepository.d';

let sharedInstance: ActivityRepository | null = null;

export default class ActivityRepository
	extends BaseRepository<Prisma.ActivityDelegate<false>>
	implements TActivityRepository
{
	static get sharedInstance(): ActivityRepository {
		if (sharedInstance === null) {
			sharedInstance = new ActivityRepository(Database.sharedInstance.getDefaultClient().activity);
		}
		return sharedInstance;
	}

	constructor(delegate: Prisma.ActivityDelegate<false>) {
		super(delegate);
	}

	public async getActivities(): Promise<Activity[]> {
		const queryResult = await this.delegate.findMany();
		return queryResult;
	}

	public async getActiveActivities(): Promise<Activity[]> {
		const queryResult = await this.delegate.findMany({ where: { isActive: true } });
		return queryResult;
	}

	public async getActivitiesByUserId(args: TGetActivitiesByUserIdArgs): Promise<Activity[]> {
		const queryResult = await this.delegate.findMany({ where: { createdBy: args.userId } });
		return queryResult;
	}

	public async getActivityById(args: TGetActivityByIdArgs): Promise<Activity | null> {
		const queryResult = await this.delegate.findUnique({ where: { id: args.id } });
		return queryResult;
	}

	public async createActivity(args: TCreateActivityArgs): Promise<Activity> {
		const queryResult = await this.delegate.create({ data: args.activity });
		return queryResult;
	}

	public async updateActivity(args: TUpdateActivityArgs): Promise<Activity> {
		const queryResult = await this.delegate.update({ where: { id: args.id }, data: args.activity });
		return queryResult;
	}

	public async softDeleteActivity(args: TSoftDeleteActivityArgs): Promise<void> {
		await this.delegate.update({ where: { id: args.id }, data: { isActive: false } });
	}

	public async hardDeleteActivity(args: THardDeleteActivityArgs): Promise<void> {
		await this.delegate.delete({ where: { id: args.id } });
	}
}
