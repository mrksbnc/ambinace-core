import type { Activity, PrismaClient } from '@prisma/client';
import type { TActivityRepository } from './activityRepository.d';

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

	public async getActivitiesByUserId(userId: number): Promise<Activity[]> {
		const queryResult = await this._client.activity.findMany({ where: { createdBy: userId } });
		return queryResult;
	}

	public async getActivityById(id: number): Promise<Activity | null> {
		const queryResult = await this._client.activity.findUnique({ where: { id } });
		return queryResult;
	}

	public async createActivity(activity: Activity): Promise<Activity> {
		const queryResult = await this._client.activity.create({ data: activity });
		return queryResult;
	}

	public async updateActivity(activity: Activity): Promise<Activity> {
		const queryResult = await this._client.activity.update({ where: { id: activity.id }, data: activity });
		return queryResult;
	}

	public async softDeleteActivity(id: number): Promise<void> {
		await this._client.activity.update({ where: { id }, data: { isActive: false } });
	}

	public async hardDeleteActivity(id: number): Promise<void> {
		await this._client.activity.delete({ where: { id } });
	}
}
