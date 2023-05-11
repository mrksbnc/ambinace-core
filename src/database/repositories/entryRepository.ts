import type {
	TCreateEntryArgs,
	TUpdateEntryArgs,
	TGetEntryByIdArgs,
	THardDeleteEntryArgs,
	TSoftDeleteEntryArgs,
	TGetEntriesByMoodArgs,
	TGetEntriesByDateArgs,
	TGetEntriesByUserIdArgs,
	TGetEntriesByDaterangeArgs,
} from '@/types/args';
import Database from '../database';
import BaseRepository from './baseRepository';
import type { Entry, Prisma } from '@prisma/client';
import type { TEntryRepository } from './entryRepository.d';

let sharedInstance: EntryRepository | null = null;

export default class EntryRepository extends BaseRepository<Prisma.EntryDelegate<false>> implements TEntryRepository {
	static get sharedInstance(): EntryRepository {
		if (sharedInstance === null) {
			sharedInstance = new EntryRepository(Database.sharedInstance.getDefaultClient().entry);
		}
		return sharedInstance;
	}

	constructor(delegate: Prisma.EntryDelegate<false>) {
		super(delegate);
	}

	public async getEntries(): Promise<Entry[]> {
		const queryResult = await this.delegate.findMany();
		return queryResult;
	}

	public async getEntriesByUserId(args: TGetEntriesByUserIdArgs): Promise<Entry[]> {
		const queryResult = await this.delegate.findMany({ where: { createdBy: args.userId } });
		return queryResult;
	}

	public async getEntriesByDate(args: TGetEntriesByDateArgs): Promise<Entry[]> {
		const queryResult = await this.delegate.findMany({ where: { createdAt: args.date } });
		return queryResult;
	}

	public async getEntriesByMood(args: TGetEntriesByMoodArgs): Promise<Entry[]> {
		const queryResult = await this.delegate.findMany({ where: { mood: args.mood } });
		return queryResult;
	}

	public async getEntriesByDaterange(args: TGetEntriesByDaterangeArgs): Promise<Entry[]> {
		const queryResult = await this.delegate.findMany({
			where: { createdAt: { gte: args.startDate, lte: args.endDate } },
		});
		return queryResult;
	}

	public async getActiveEntries(): Promise<Entry[]> {
		const queryResult = await this.delegate.findMany({ where: { isActive: true } });
		return queryResult;
	}

	public async getEntryById(args: TGetEntryByIdArgs): Promise<Entry | null> {
		const queryResult = await this.delegate.findUnique({ where: { id: args.id } });
		return queryResult;
	}

	public async createEntry(args: TCreateEntryArgs): Promise<Entry> {
		const queryResult = await this.delegate.create({ data: args.entry });
		return queryResult;
	}

	public async updateEntry(args: TUpdateEntryArgs): Promise<Entry> {
		const queryResult = await this.delegate.update({ where: { id: args.id }, data: args.entry });
		return queryResult;
	}

	public async softDeleteEntry(args: TSoftDeleteEntryArgs): Promise<void> {
		await this.delegate.update({ where: { id: args.id }, data: { isActive: false } });
	}

	public async hardDeleteEntry(args: THardDeleteEntryArgs): Promise<void> {
		await this.delegate.delete({ where: { id: args.id } });
	}
}
