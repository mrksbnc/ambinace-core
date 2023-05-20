import type {
	TCreateEntryRequestDto,
	TCreateEntryResponseDto,
	TDeleteEntryRequestDto,
	TUpdateEntryRequestDto,
	TRestoreEntryRequestDto,
	TGetEntryByIdRequestDto,
	TUpdateEntryResponseDto,
	TGetEntryByIdResponseDto,
	TGetEntriesByUserIdRequestDto,
	TGetEntriesByUserIdResponseDto,
	TGetActiveEntriesByUserIdRequestDto,
	TGetEntriesByUserIdAndDateRequestDto,
	TGetActiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndMoodRequestDto,
	TGetEntriesByUserIdAndDateResponseDto,
	TGetInactiveEntriesByUserIdRequestDto,
	TGetEntriesByUserIdAndMoodResponseDto,
	TGetInactiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndDateRangeRequestDto,
	TGetEntriesByUserIdAndDateRangeResponseDto,
} from '@/api/dto';
import type { Entry } from '@prisma/client';
import Validator from '@/validators/validator';
import EntrySchema from '@/validators/schemas/entrySchema';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import EntryRepository from '@/database/repositories/entryRepository';
import type { TEntryRepository } from '@/database/repositories/entryRepository.d';
import InvalidDateRangeArgumentError from '@/error/invalidDateRangeArgumentError';
import type { TEntryService, TEntryServiceConstructorArgs } from './entryService.d';

let sharedInstance: EntryService | null = null;

export default class EntryService implements TEntryService {
	private readonly _entryRepository: TEntryRepository;

	public static get sharedInstance(): EntryService {
		if (sharedInstance === null) {
			sharedInstance = new EntryService({
				repository: EntryRepository.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ repository }: TEntryServiceConstructorArgs) {
		this._entryRepository = repository;
	}

	public async getById({ id }: TGetEntryByIdRequestDto): Promise<TGetEntryByIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		const repositoryResult: Entry | null = await this._entryRepository.findById({ id: numId });

		const dto: TGetEntryByIdResponseDto = {
			entry: repositoryResult,
		};

		return dto;
	}

	public async getByUserId({ userId }: TGetEntriesByUserIdRequestDto): Promise<TGetEntriesByUserIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const numUserId: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this._entryRepository.findByUserId({ userId: numUserId });

		const dto: TGetEntriesByUserIdResponseDto = {
			entries: repositoryResult,
		};

		return dto;
	}

	public async getByUserIdAndDate({
		userId,
		date,
	}: TGetEntriesByUserIdAndDateRequestDto): Promise<TGetEntriesByUserIdAndDateResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const pastDateLimit: string = new Date().toISOString();

		if (!Validator.sharedInstance.isValidPastDate(date, pastDateLimit)) {
			throw new InvalidArgumentError();
		}

		const dateObj: Date = new Date(date);
		const userIdNum: number = parseInt(userId, 10);

		const repositoryResult: Entry[] = await this._entryRepository.findByUserIdAndDate({
			userId: userIdNum,
			date: dateObj,
		});

		const dto: TGetEntriesByUserIdAndDateResponseDto = {
			entries: repositoryResult,
		};

		return dto;
	}

	public async getByUserIdAndDateRange({
		userId,
		startDate,
		endDate,
	}: TGetEntriesByUserIdAndDateRangeRequestDto): Promise<TGetEntriesByUserIdAndDateRangeResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		if (!Validator.sharedInstance.isValidDate(startDate)) {
			throw new InvalidArgumentError();
		}

		if (endDate == null) {
			endDate = new Date().toISOString();
		}

		const endDateObj: Date = new Date(endDate);
		const startDateObj: Date = new Date(startDate);

		if (startDateObj.getTime() > endDateObj.getTime()) {
			throw new InvalidDateRangeArgumentError();
		}

		const userIdNum: number = parseInt(userId, 10);

		const repositoryResult: Entry[] = await this._entryRepository.findByUserIdAndDateRange({
			userId: userIdNum,
			startDate: startDateObj,
			endDate: endDateObj,
		});

		const dto: TGetEntriesByUserIdAndDateRangeResponseDto = {
			entries: repositoryResult,
		};

		return dto;
	}

	public async getByUserIdAndMood({
		userId,
		moodId,
	}: TGetEntriesByUserIdAndMoodRequestDto): Promise<TGetEntriesByUserIdAndMoodResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		if (!Validator.sharedInstance.isValidId(moodId)) {
			throw new InvalidArgumentError('moodId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const moodIdNum: number = parseInt(moodId, 10);

		const repositoryResult: Entry[] = await this._entryRepository.findByUserIdAndMood({
			userId: userIdNum,
			moodId: moodIdNum,
		});

		const dto: TGetEntriesByUserIdAndMoodResponseDto = {
			entries: repositoryResult,
		};

		return dto;
	}

	public async getActiveByUserId({
		userId,
	}: TGetActiveEntriesByUserIdRequestDto): Promise<TGetActiveEntriesByUserIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this._entryRepository.findActiveByUserId({ userId: userIdNum });

		const dto: TGetActiveEntriesByUserIdResponseDto = {
			entries: repositoryResult,
		};

		return dto;
	}

	public async getInactiveByUserId({
		userId,
	}: TGetInactiveEntriesByUserIdRequestDto): Promise<TGetInactiveEntriesByUserIdResponseDto> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this._entryRepository.findInactiveByUserId({ userId: userIdNum });

		const dto: TGetInactiveEntriesByUserIdResponseDto = {
			entries: repositoryResult,
		};

		return dto;
	}

	public async create({ entry }: TCreateEntryRequestDto): Promise<TCreateEntryResponseDto> {
		const schemaValidationResult = Validator.sharedInstance.isValidSchema(EntrySchema.sharedInstance.create, entry);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const repositoryResult: Entry = await this._entryRepository.create({ entry });

		const dto: TCreateEntryResponseDto = {
			entry: repositoryResult,
		};

		return dto;
	}

	public async update({ id, entry }: TUpdateEntryRequestDto): Promise<TUpdateEntryResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const schemaValidationResult = Validator.sharedInstance.isValidSchema(EntrySchema.sharedInstance.update, entry);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult: Entry = await this._entryRepository.update({ id: idNum, entry });

		const dto: TUpdateEntryResponseDto = {
			entry: repositoryResult,
		};

		return dto;
	}

	public async softDelete({ id }: TDeleteEntryRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._entryRepository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreEntryRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._entryRepository.restore({ id: idNum });
	}

	public async hardDelete({ id }: TDeleteEntryRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._entryRepository.hardDelete({ id: idNum });
	}
}
