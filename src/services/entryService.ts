import type {
	TEntryService,
	TCreateEntryServiceArgs,
	TUpdateEntryServiceArgs,
	TDeleteEntryServiceArgs,
	TGetEntryByIdServiceArgs,
	TRestoreEntryServiceArgs,
	TEntryServiceConstructorArgs,
	TGetEntriesByUserIdServiceArgs,
	TGetEntriesByUserIdAndDateServiceArgs,
	TGetEntriesByUserIdAndMoodServiceArgs,
	TGetEntriesByUserIdAndDateRangeServiceArgs,
} from './entryService.d';
import type { Entry } from '@prisma/client';
import Validator from '@/validators/validator';
import EntrySchema from '@/validators/schemas/entrySchema';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import EntryRepository from '@/database/repositories/entryRepository';
import type { TEntryRepository } from '@/database/repositories/entryRepository.d';
import InvalidDateRangeArgumentError from '@/error/invalidDateRangeArgumentError';

let sharedInstance: EntryService | null = null;

export default class EntryService implements TEntryService {
	private readonly repository: TEntryRepository;

	static get sharedInstance(): EntryService {
		if (sharedInstance === null) {
			sharedInstance = new EntryService({
				repository: EntryRepository.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ repository }: TEntryServiceConstructorArgs) {
		this.repository = repository;
	}

	public async getById({ id }: TGetEntryByIdServiceArgs): Promise<Entry | null> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const numId: number = parseInt(id, 10);
		const repositoryResult: Entry | null = await this.repository.findById({ id: numId });

		return repositoryResult;
	}

	public async getByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const numUserId: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this.repository.findByUserId({ userId: numUserId });
		return repositoryResult;
	}

	public async getByUserIdAndDate({ userId, date }: TGetEntriesByUserIdAndDateServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const pastDateLimit: string = new Date().toISOString();

		if (!Validator.sharedInstance.isValidPastDate(date, pastDateLimit)) {
			throw new InvalidArgumentError();
		}

		const dateObj: Date = new Date(date);
		const userIdNum: number = parseInt(userId, 10);

		const repositoryResult: Entry[] = await this.repository.findByUserIdAndDate({
			userId: userIdNum,
			date: dateObj,
		});

		return repositoryResult;
	}

	public async getByUserIdAndDateRange({
		userId,
		startDate,
		endDate,
	}: TGetEntriesByUserIdAndDateRangeServiceArgs): Promise<Entry[]> {
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

		const repositoryResult: Entry[] = await this.repository.findByUserIdAndDateRange({
			userId: userIdNum,
			startDate: startDateObj,
			endDate: endDateObj,
		});

		return repositoryResult;
	}

	public async getByUserIdAndMood({ userId, mood }: TGetEntriesByUserIdAndMoodServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this.repository.findByUserIdAndMood({
			userId: userIdNum,
			mood,
		});

		return repositoryResult;
	}

	public async getActiveByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this.repository.findActiveByUserId({ userId: userIdNum });
		return repositoryResult;
	}

	public async getInactiveByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidId(userId)) {
			throw new InvalidArgumentError('userId');
		}

		const userIdNum: number = parseInt(userId, 10);
		const repositoryResult: Entry[] = await this.repository.findInactiveByUserId({ userId: userIdNum });
		return repositoryResult;
	}

	public async create({ entry }: TCreateEntryServiceArgs): Promise<Entry> {
		const schemaValidationResult = Validator.sharedInstance.isValidSchema(EntrySchema.sharedInstance.create, entry);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const repositoryResult: Entry = await this.repository.create({ entry });
		return repositoryResult;
	}

	public async update({ id, entry }: TUpdateEntryServiceArgs): Promise<Entry> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const schemaValidationResult = Validator.sharedInstance.isValidSchema(EntrySchema.sharedInstance.update, entry);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult: Entry = await this.repository.update({ id: idNum, entry });
		return repositoryResult;
	}

	public async softDelete({ id }: TDeleteEntryServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this.repository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreEntryServiceArgs): Promise<Entry> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult: Entry = await this.repository.restore({ id: idNum });
		return repositoryResult;
	}

	public async hardDelete({ id }: TDeleteEntryServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this.repository.hardDelete({ id: idNum });
	}
}
