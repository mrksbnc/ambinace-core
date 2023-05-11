import type {
	TUpdateEntryArgs,
	TCreateEntryArgs,
	TGetEntryByIdArgs,
	THardDeleteEntryArgs,
	TGetEntriesByMoodArgs,
	TGetEntriesByDateArgs,
	TGetEntriesByUserIdArgs,
	TSoftDeleteActivityArgs,
	TGetEntriesByDaterangeArgs,
} from '@/types/args.d';
import type { Entry } from '@prisma/client';
import type { TEntryService } from './entryService.d';
import EntryReposiory from '@/database/repositories/entryRepository';

let sharedInstance: EntryService | null = null;

export default class EntryService implements TEntryService {
	private readonly _entryRepository: EntryReposiory;

	static get sharedInstance(): EntryService {
		if (sharedInstance === null) {
			sharedInstance = new EntryService(EntryReposiory.sharedInstance);
		}
		return sharedInstance;
	}

	constructor(repository: EntryReposiory) {
		this._entryRepository = repository;
	}

	public async getEntries(): Promise<Entry[]> {
		const repositoryResult = await this._entryRepository.getEntries();
		return repositoryResult;
	}

	public async getEntriesByUserId(args: TGetEntriesByUserIdArgs): Promise<Entry[]> {
		const repositoryResult = await this._entryRepository.getEntriesByUserId(args);
		return repositoryResult;
	}

	public async getEntriesByDate(args: TGetEntriesByDateArgs): Promise<Entry[]> {
		const repositoryResult = await this._entryRepository.getEntriesByDate(args);
		return repositoryResult;
	}

	public async getEntriesByMood(args: TGetEntriesByMoodArgs): Promise<Entry[]> {
		const repositoryResult = await this._entryRepository.getEntriesByMood(args);
		return repositoryResult;
	}

	public async getEntriesByDaterange(args: TGetEntriesByDaterangeArgs): Promise<Entry[]> {
		const repositoryResult = await this._entryRepository.getEntriesByDaterange(args);
		return repositoryResult;
	}

	public async getActiveEntries(): Promise<Entry[]> {
		const repositoryResult = await this._entryRepository.getActiveEntries();
		return repositoryResult;
	}

	public async getEntryById(args: TGetEntryByIdArgs): Promise<Entry | null> {
		const repositoryResult = await this._entryRepository.getEntryById(args);
		return repositoryResult;
	}

	public async createEntry(args: TCreateEntryArgs): Promise<Entry> {
		const repositoryResult = await this._entryRepository.createEntry(args);
		return repositoryResult;
	}

	public async updateEntry(args: TUpdateEntryArgs): Promise<Entry> {
		const repositoryResult = await this._entryRepository.updateEntry(args);
		return repositoryResult;
	}

	public async softDeleteEntry(args: TSoftDeleteActivityArgs): Promise<void> {
		const repositoryResult = await this._entryRepository.softDeleteEntry(args);
		return repositoryResult;
	}

	public async hardDeleteEntry(args: THardDeleteEntryArgs): Promise<void> {
		const repositoryResult = await this._entryRepository.hardDeleteEntry(args);
		return repositoryResult;
	}
}
