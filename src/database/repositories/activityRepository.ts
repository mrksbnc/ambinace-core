import type {
	TActivityRepository,
	TCreateActivityArgs,
	TUpdateActivityArgs,
	TGetActivityByIdArgs,
	THardDeleteActivityArgs,
	TSoftDeleteActivityArgs,
	TGetActivitiesByUserIdArgs,
} from './activityRepository.d';
import type { Activity, PrismaClient } from '@prisma/client';

export default class ActivityRepository implements TActivityRepository {
	private readonly _client: PrismaClient;

	constructor(client: PrismaClient) {
		this._client = client;
	}

	public async getActivities(): Promise<Activity[]> {
		const queryResult = await this._client.activity.findMany();
		return queryResult;
	}

	public async getActiveActivities(): Promise<Activity[]> {
		const queryResult = await this._client.activity.findMany({ where: { isActive: true } });
		return queryResult;
	}

	public async getActivitiesByUserId(args: TGetActivitiesByUserIdArgs): Promise<Activity[]> {
		const queryResult = await this._client.activity.findMany({ where: { createdBy: args.userId } });
		return queryResult;
	}

	public async getActivityById(args: TGetActivityByIdArgs): Promise<Activity | null> {
		const queryResult = await this._client.activity.findUnique({ where: { id: args.id } });
		return queryResult;
	}

	public async createActivity(args: TCreateActivityArgs): Promise<Activity> {
		const queryResult = await this._client.activity.create({ data: args.activity });
		return queryResult;
	}

	public async updateActivity(args: TUpdateActivityArgs): Promise<Activity> {
		const queryResult = await this._client.activity.update({ where: { id: args.id }, data: args.activity });
		return queryResult;
	}

	public async softDeleteActivity(args: TSoftDeleteActivityArgs): Promise<void> {
		await this._client.activity.update({ where: { id: args.id }, data: { isActive: false } });
	}

	public async hardDeleteActivity(args: THardDeleteActivityArgs): Promise<void> {
		await this._client.activity.delete({ where: { id: args.id } });
	}
}
