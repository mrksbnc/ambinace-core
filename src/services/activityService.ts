import type {
	TCreateActivityRequestDto,
	TUpdateActivityRequestDto,
	TDeleteActivityRequestDto,
	TUpdateActivityResponseDto,
	TRestoreActivityRequestDto,
	TCreateActivityResponseDto,
	TGetActivityByIdRequestDto,
	TGetActivityByIdResponseDto,
	TGetDefaultsWithUserRequestDto,
	TGetActivitiesByUserIdRequestDto,
	TGetActivitiesByUserIdResponseDto,
	TGetActivitiesByIdListResponseDto,
	TGetManyActivityByIdListRequestDto,
	TGetDefaultActivitiesWithUserResponseDto,
} from '@/api/dto.d';
import type { Activity } from '@prisma/client';
import Validator from '@/validators/validator';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import ActivitySchema from '@/validators/schemas/activitySchema';
import ActivityRepository from '@/database/repositories/activityRepository';
import type { TActivityRepository } from '../database/repositories/activityRepository.d';
import type { TActivityService, TActivityServiceConstructorArgs } from './activityService.d';

let sharedInstance: ActivityService | null = null;

export default class ActivityService implements TActivityService {
	private readonly _activityRepository: TActivityRepository;

	public static get sharedInstance(): ActivityService {
		if (sharedInstance === null) {
			sharedInstance = new ActivityService({
				activityRepository: ActivityRepository.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ activityRepository }: TActivityServiceConstructorArgs) {
		this._activityRepository = activityRepository;
	}

	public async getById({ id }: TGetActivityByIdRequestDto): Promise<TGetActivityByIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		const repositoryResult: Activity | null = await this._activityRepository.findById({ id: numId });

		const dto: TGetActivityByIdResponseDto = {
			activity: repositoryResult,
		};

		return dto;
	}

	public async getDefaultsWithUser({
		userId,
	}: TGetDefaultsWithUserRequestDto): Promise<TGetDefaultActivitiesWithUserResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const numUserId: number = parseInt(userId, 10);
		const repositoryResult: Activity[] = await this._activityRepository.findAllDefaultWithUser({ userId: numUserId });

		const dto: TGetDefaultActivitiesWithUserResponseDto = {
			activities: repositoryResult,
		};

		return dto;
	}

	public async getManyByIds({ ids }: TGetManyActivityByIdListRequestDto): Promise<TGetActivitiesByIdListResponseDto> {
		const invalidId = ids.find((id) => !Validator.sharedInstance.isValidId(id));

		if (invalidId !== undefined) {
			throw new InvalidArgumentError('ids');
		}

		const numIds: number[] = ids.map((id) => parseInt(id, 10));
		const repositoryResult: Activity[] = await this._activityRepository.findManyByIds({ ids: numIds });

		const dto: TGetActivitiesByIdListResponseDto = {
			activities: repositoryResult,
		};

		return dto;
	}

	public async getManyByUserId({
		userId,
	}: TGetActivitiesByUserIdRequestDto): Promise<TGetActivitiesByUserIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const numUserId: number = parseInt(userId, 10);
		const repositoryResult: Activity[] = await this._activityRepository.findManyByUserId({
			userId: numUserId,
		});

		const dto: TGetActivitiesByUserIdResponseDto = {
			activities: repositoryResult,
		};

		return dto;
	}

	public async create({ activity }: TCreateActivityRequestDto): Promise<TCreateActivityResponseDto> {
		const schemaValidationResult = Validator.sharedInstance.isValidSchema(
			ActivitySchema.sharedInstance.create,
			activity,
		);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const repositoryResult: Activity = await this._activityRepository.create({ activity });

		const dto: TCreateActivityResponseDto = {
			activity: repositoryResult,
		};

		return dto;
	}

	public async update({ id, activity }: TUpdateActivityRequestDto): Promise<TUpdateActivityResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const schemaValidationResult = Validator.sharedInstance.isValidSchema(
			ActivitySchema.sharedInstance.update,
			activity,
		);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const numId: number = parseInt(id, 10);
		const repositoryResult: Promise<Activity> = await this._activityRepository.update({ id: numId, activity });

		const dto: TUpdateActivityResponseDto = {
			activity: repositoryResult,
		};

		return dto;
	}

	public async softDelete({ id }: TDeleteActivityRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		await this._activityRepository.softDelete({ id: numId });
	}

	public async restore({ id }: TRestoreActivityRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		await this._activityRepository.restore({ id: numId });
	}

	public async hardDelete({ id }: TDeleteActivityRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		await this._activityRepository.hardDelete({ id: numId });
	}
}
