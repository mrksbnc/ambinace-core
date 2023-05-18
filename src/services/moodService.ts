import type {
	TUpdateMoodRequestDto,
	TCreateMoodRequestDto,
	TGetMoodByIdRequestDto,
	TCreateMoodResponseDto,
	TRestoreMoodRequestDto,
	TUpdateMoodResponseDto,
	TGetMoodByIdResponseDto,
	TGetMoodsByUserIdRequestDto,
	TGetMoodsByUserIdResponseDto,
} from '@/api/dto';
import Validator from '@/validators/validator';
import MoodSchema from '@/validators/schemas/moodSchema';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import MoodRepository from '@/database/repositories/moodRepository';
import type { TMoodService, TMoodServiceConstructorArgs } from './moodService.d';
import type { TMoodRepository } from '@/database/repositories/moodRepository.d';

let sharedInstance: MoodService | null = null;

export default class MoodService implements TMoodService {
	private readonly _moodRepository: TMoodRepository;

	public static get sharedInstance(): MoodService {
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

	public async getById({ id }: TGetMoodByIdRequestDto): Promise<TGetMoodByIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult = await this._moodRepository.findById({ id: idNum });

		const dto: TGetMoodByIdResponseDto = {
			mood: repositoryResult,
		};

		return dto;
	}

	public async getByUserId({ userId }: TGetMoodsByUserIdRequestDto): Promise<TGetMoodsByUserIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult = await this._moodRepository.findByUserId({ userId: userIdNum });

		const dto: TGetMoodsByUserIdResponseDto = {
			moods: repositoryResult,
		};

		return dto;
	}

	public async getDefaultsWithUser({ userId }: TGetMoodsByUserIdRequestDto): Promise<TGetMoodsByUserIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult = await this._moodRepository.findDefaultsWithUser({ userId: userIdNum });

		const dto: TGetMoodsByUserIdResponseDto = {
			moods: repositoryResult,
		};

		return dto;
	}

	public async create({ mood }: TCreateMoodRequestDto): Promise<TCreateMoodResponseDto> {
		const schemaValidationResult = Validator.sharedInstance.isValidSchema(MoodSchema.sharedInstance.create, mood);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const repositoryResult = await this._moodRepository.create({ mood });

		const dto: TCreateMoodResponseDto = {
			mood: repositoryResult,
		};

		return dto;
	}

	public async update({ id, mood }: TUpdateMoodRequestDto): Promise<TUpdateMoodResponseDto> {
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

		const dto: TUpdateMoodResponseDto = {
			mood: repositoryResult,
		};

		return dto;
	}

	public async softDelete({ id }: TUpdateMoodRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._moodRepository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreMoodRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._moodRepository.restore({ id: idNum });
	}

	public async hardDelete({ id }: TUpdateMoodRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._moodRepository.hardDelete({ id: idNum });
	}
}
