import type {
	TActivityService,
	TUpdateActivityServiceArgs,
	TCreateActivityServiceArgs,
	TGetAllDefaultWithUserArgs,
	TDeleteActivityServiceArgs,
	TGetActivityByIdServiceArgs,
	TRestoreActivityServiceArgs,
	TGetManyByUserIdServiceArgs,
	TActivityServiceConstructorArgs,
	TGetManyActivitiesByIdsServiceArgs,
} from './activityService';
import type { Activity } from '@prisma/client';
import Validator from '@/validators/validator';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import ActivitySchema from '@/validators/schemas/activitySchema';
import ActivityRepository from '@/database/repositories/activityRepository';
import type { TActivityRepository } from '../database/repositories/activityRepository';

let sharedInstance: ActivityService | null = null;

export default class ActivityService implements TActivityService {
	private readonly _activityRepository: TActivityRepository;

	static get sharedInstance(): ActivityService {
		if (sharedInstance === null) {
			sharedInstance = new ActivityService({ activityRepository: ActivityRepository.sharedInstance });
		}
		return sharedInstance;
	}

	constructor({ activityRepository }: TActivityServiceConstructorArgs) {
		this._activityRepository = activityRepository;
	}

	public async getById({ id }: TGetActivityByIdServiceArgs): Promise<Activity | null> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		const repositoryResult: Activity | null = await this._activityRepository.findById({ id: numId });

		return repositoryResult;
	}

	public async getAllDefaultWithUser({ userId }: TGetAllDefaultWithUserArgs): Promise<Activity[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const numUserId: number = parseInt(userId, 10);
		const repositoryResult: Activity[] = await this._activityRepository.findAllDefaultWithUser({ userId: numUserId });

		return repositoryResult;
	}

	public async getManyByIds({ ids }: TGetManyActivitiesByIdsServiceArgs): Promise<Activity[]> {
		const invalidId = ids.find((id) => !Validator.sharedInstance.isValidId(id));

		if (invalidId !== undefined) {
			throw new InvalidArgumentError('ids');
		}

		const numIds: number[] = ids.map((id) => parseInt(id, 10));
		const repositoryResult: Activity[] = await this._activityRepository.findManyByIds({ ids: numIds });

		return repositoryResult;
	}

	public async getManyByUserId({ userId }: TGetManyByUserIdServiceArgs): Promise<Activity[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const numUserId: number = parseInt(userId, 10);
		const repositoryResult: Activity[] = await this._activityRepository.findManyByUserId({
			userId: numUserId,
		});

		return repositoryResult;
	}

	public async create({ activity }: TCreateActivityServiceArgs): Promise<Activity> {
		if (!Validator.sharedInstance.isValidSchema(ActivitySchema.sharedInstance.create, activity)) {
			throw new InvalidPayloadError();
		}

		const repositoryResult: Promise<Activity> = await this._activityRepository.create({ activity });
		return repositoryResult;
	}

	public async update({ id, activity }: TUpdateActivityServiceArgs): Promise<Activity> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		if (!Validator.sharedInstance.isValidSchema(ActivitySchema.sharedInstance.update, activity)) {
			throw new InvalidPayloadError();
		}

		const numId: number = parseInt(id, 10);
		const repositoryResult: Promise<Activity> = await this._activityRepository.update({ id: numId, activity });

		return repositoryResult;
	}

	public async softDelete({ id }: TDeleteActivityServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		await this._activityRepository.softDelete({ id: numId });
	}

	public async restore({ id }: TRestoreActivityServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		await this._activityRepository.restore({ id: numId });
	}

	public async hardDelete({ id }: TDeleteActivityServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		await this._activityRepository.hardDelete({ id: numId });
	}
}
