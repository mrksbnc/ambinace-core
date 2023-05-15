import type {
	TMoodService,
	TCreateMoodServiceArgs,
	TUpdateMoodServiceArgs,
	TDeleteMoodServiceArgs,
	TRestoreMoodServiceArgs,
	TGetMoodByIdServiceArgs,
	TMoodServiceConstructorArgs,
	TGetMoodsByUserIdServiceArgs,
} from './moodService.d';
import type { Mood } from '@prisma/client';
import Validator from '@/validators/validator';
import MoodSchema from '@/validators/schemas/moodSchema';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import MoodRepository from '@/database/repositories/moodRepository';
import type { TMoodRepository } from '@/database/repositories/moodRepository.d';

let sharedInstance: MoodService | null = null;

export default class MoodService implements TMoodService {
	private readonly _moodRepository: TMoodRepository;

	static get sharedInstance(): MoodService {
		if (sharedInstance === null) {
			sharedInstance = new MoodService({
				moodRepository: MoodRepository.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ moodRepository }: TMoodServiceConstructorArgs) {
		this._moodRepository = moodRepository;
	}

	public async getById({ id }: TGetMoodByIdServiceArgs): Promise<Mood | null> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult = await this._moodRepository.findById({ id: idNum });

		return repositoryResult;
	}

	public async getByUserId({ userId }: TGetMoodsByUserIdServiceArgs): Promise<Mood[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult = await this._moodRepository.findByUserId({ userId: userIdNum });

		return repositoryResult;
	}

	public async getDefaultsWithUser({ userId }: TGetMoodsByUserIdServiceArgs): Promise<Mood[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult = await this._moodRepository.findDefaultsWithUser({ userId: userIdNum });

		return repositoryResult;
	}

	public async create({ mood }: TCreateMoodServiceArgs): Promise<Mood> {
		const schemaValidationResult = Validator.sharedInstance.isValidSchema(MoodSchema.sharedInstance.create, mood);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const repositoryResult = await this._moodRepository.create({ mood });
		return repositoryResult;
	}

	public async update({ id, mood }: TUpdateMoodServiceArgs): Promise<Mood> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const schemaValidationResult = Validator.sharedInstance.isValidSchema(MoodSchema.sharedInstance.create, mood);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult = await this._moodRepository.update({
			id: idNum,
			mood,
		});

		return repositoryResult;
	}

	public async softDelete({ id }: TDeleteMoodServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._moodRepository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreMoodServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._moodRepository.restore({ id: idNum });
	}

	public async hardDelete({ id }: TDeleteMoodServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._moodRepository.hardDelete({ id: idNum });
	}
}
