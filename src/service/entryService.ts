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
import Validator from '@/utils/validator';
import type { Entry } from '@prisma/client';
import EntryRepository from '@/database/repositories/entryRepository';
import { InvalidDateArgumentError } from '@/error/validation/invalidDate';
import { InvalidNumericArgumentError } from '@/error/validation/invalidNumericId';
import type { TEntryRepository } from '@/database/repositories/entryRepository.d';
import { InvalidDateRangeArgumentError } from '@/error/validation/InvalidDateRangeArgumentError';

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
		if (!Validator.sharedInstance.isValidNumericId(id)) {
			throw InvalidNumericArgumentError;
		}

		const repositoryResult: Entry | null = await this.repository.findById({ id });
		return repositoryResult;
	}

	public async getByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidNumericId(userId)) {
			throw InvalidNumericArgumentError;
		}

		const repositoryResult: Entry[] = await this.repository.findByUserId({ userId });
		return repositoryResult;
	}

	public async getByUserIdAndDate({ userId, date }: TGetEntriesByUserIdAndDateServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidNumericId(userId)) {
			throw InvalidNumericArgumentError;
		}

		if (!Validator.sharedInstance.isValidPastOrNowDate(date)) {
			throw InvalidDateArgumentError;
		}

		const repositoryResult: Entry[] = await this.repository.findByUserIdAndDate({ userId, date });
		return repositoryResult;
	}

	public async getByUserIdAndDateRange({
		userId,
		startDate,
		endDate,
	}: TGetEntriesByUserIdAndDateRangeServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidNumericId(userId)) {
			throw InvalidNumericArgumentError;
		}

		if (!Validator.sharedInstance.isValidPastOrNowDate(startDate)) {
			throw InvalidDateArgumentError;
		}

		if (endDate == null) {
			endDate = new Date();
		}

		if (endDate && !Validator.sharedInstance.isValidPastOrNowDate(endDate)) {
			throw InvalidDateArgumentError;
		}

		if (startDate > endDate) {
			throw InvalidDateRangeArgumentError;
		}

		const repositoryResult: Entry[] = await this.repository.findByUserIdAndDateRange({
			userId,
			startDate,
			endDate,
		});
		return repositoryResult;
	}

	public async getByUserIdAndMood({ userId, mood }: TGetEntriesByUserIdAndMoodServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidNumericId(userId)) throw InvalidNumericArgumentError;

		const repositoryResult: Entry[] = await this.repository.findByUserIdAndMood({ userId, mood });
		return repositoryResult;
	}

	public async getActiveByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidNumericId(userId)) throw InvalidNumericArgumentError;

		const repositoryResult: Entry[] = await this.repository.findActiveByUserId({ userId });
		return repositoryResult;
	}

	public async getInactiveByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]> {
		if (!Validator.sharedInstance.isValidNumericId(userId)) {
			throw InvalidNumericArgumentError;
		}

		const repositoryResult: Entry[] = await this.repository.findInactiveByUserId({ userId });
		return repositoryResult;
	}

	public async create({ entry }: TCreateEntryServiceArgs): Promise<Entry> {
		const repositoryResult: Entry = await this.repository.create({ entry });
		return repositoryResult;
	}

	public async update({ id, entry }: TUpdateEntryServiceArgs): Promise<Entry> {
		if (!Validator.sharedInstance.isValidNumericId(id)) {
			throw InvalidNumericArgumentError;
		}

		const repositoryResult: Entry = await this.repository.update({ id, entry });
		return repositoryResult;
	}

	public async softDelete({ id }: TDeleteEntryServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidNumericId(id)) {
			throw InvalidNumericArgumentError;
		}

		await this.repository.softDelete({ id });
	}

	public async restore({ id }: TRestoreEntryServiceArgs): Promise<Entry> {
		if (!Validator.sharedInstance.isValidNumericId(id)) {
			throw InvalidNumericArgumentError;
		}

		const repositoryResult: Entry = await this.repository.restore({ id });
		return repositoryResult;
	}

	public async hardDelete({ id }: TDeleteEntryServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidNumericId(id)) {
			throw InvalidNumericArgumentError;
		}

		await this.repository.hardDelete({ id });
	}
}
