import Database from '../database';
import type {
	TActivityRepository,
	TFindActivitiesByIds,
	TCreateActivityArgs,
	TUpdateActivityArgs,
	TDeleteActivityArgs,
	TFindActivityByIdArgs,
	TFindSystemWithUserIdsArgs,
	TFindActivitiesByUserIdArgs,
	TActivityRepositoryConstructorArgs,
} from './activityRepository.d';
import type { Activity, Prisma } from '@prisma/client';

let sharedInstance: ActivityRepository | null = null;

export default class ActivityRepository implements TActivityRepository {
	private readonly _delegate: Prisma.ActivityDelegate<false>;

	public static get sharedInstance(): ActivityRepository {
		if (sharedInstance === null) {
			sharedInstance = new ActivityRepository({
				delegate: Database.sharedInstance.getDefaultClient().activity,
			});
		}
		return sharedInstance;
	}

	constructor({ delegate }: TActivityRepositoryConstructorArgs) {
		this._delegate = delegate;
	}

	async findById({ id }: TFindActivityByIdArgs): Promise<Activity | null> {
		const queryResult = await this._delegate.findUnique({ where: { id }, rejectOnNotFound: false });
		return queryResult;
	}

	async findAllDefaultWithUser({ userId }: TFindSystemWithUserIdsArgs): Promise<Activity[]> {
		const queryResult = await this._delegate.findMany({
			where: {
				OR: [
					{ userId },
					{
						userId: null,
					},
				],
			},
		});
		return queryResult;
	}

	async findManyByIds({ ids }: TFindActivitiesByIds): Promise<Activity[]> {
		const queryResult = await this._delegate.findMany({ where: { id: { in: ids } } });
		return queryResult;
	}

	async findManyByUserId({ userId }: TFindActivitiesByUserIdArgs): Promise<Activity[]> {
		const queryResult = await this._delegate.findMany({ where: { userId } });
		return queryResult;
	}

	async create({ activity }: TCreateActivityArgs): Promise<Activity> {
		const queryResult = await this._delegate.create({ data: activity });
		return queryResult;
	}

	async update({ id, activity }: TUpdateActivityArgs): Promise<Activity> {
		const queryResult = await this._delegate.update({ where: { id }, data: activity });
		return queryResult;
	}

	async softDelete({ id }: TDeleteActivityArgs): Promise<void> {
		await this._delegate.update({ where: { id }, data: { isActive: false } });
	}

	async restore({ id }: TDeleteActivityArgs): Promise<void> {
		await this._delegate.update({ where: { id }, data: { isActive: true } });
	}

	async hardDelete({ id }: TDeleteActivityArgs): Promise<void> {
		await this._delegate.delete({ where: { id } });
	}
}
