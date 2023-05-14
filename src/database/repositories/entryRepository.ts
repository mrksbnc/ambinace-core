import Database from '../database';
import type {
	TCreateEntryArgs,
	TDeleteEntryArgs,
	TEntryRepository,
	TUpdateEntryArgs,
	TRestoreEntryArgs,
	TGetEntryByIdArgs,
	TGetEntriesByUserIdArgs,
	TGetEntriesByUserIdAndMoodArgs,
	TGetEntriesByUserIdAndDateArgs,
	TEntryRepositoryConstructorArgs,
	TGetEntriesByUserIdAndDateRangeArgs,
} from './entryRepository.d';
import type { Entry, Prisma } from '@prisma/client';

let sharedInstance: EntryRepository | null = null;

export default class EntryRepository implements TEntryRepository {
	private readonly _delegate: Prisma.EntryDelegate<false>;

	static get sharedInstance(): EntryRepository {
		if (sharedInstance === null) {
			sharedInstance = new EntryRepository({
				delegate: Database.sharedInstance.getDefaultClient().entry,
			});
		}
		return sharedInstance;
	}

	constructor({ delegate }: TEntryRepositoryConstructorArgs) {
		this._delegate = delegate;
	}

	async findById({ id }: TGetEntryByIdArgs): Promise<Entry | null> {
		const queryResult = await this._delegate.findUnique({ where: { id }, rejectOnNotFound: false });
		return queryResult;
	}

	async findByUserId({ userId }: TGetEntriesByUserIdArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId } });
		return queryResult;
	}

	async findByUserIdAndDate({ userId, date }: TGetEntriesByUserIdAndDateArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, createdAt: date } });
		return queryResult;
	}

	async findByUserIdAndDateRange({
		userId,
		startDate,
		endDate,
	}: TGetEntriesByUserIdAndDateRangeArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({
			where: { userId, createdAt: { gte: startDate, lte: endDate } },
		});

		return queryResult;
	}

	async findByUserIdAndMood({ userId, mood }: TGetEntriesByUserIdAndMoodArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, mood } });
		return queryResult;
	}

	async findActiveByUserId({ userId }: TGetEntriesByUserIdArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, isActive: true } });
		return queryResult;
	}

	async findInactiveByUserId({ userId }: TGetEntriesByUserIdArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, isActive: false } });
		return queryResult;
	}

	async create({ entry }: TCreateEntryArgs): Promise<Entry> {
		const queryResult = await this._delegate.create({ data: entry });
		return queryResult;
	}

	async update({ id, entry }: TUpdateEntryArgs): Promise<Entry> {
		const queryResult = await this._delegate.update({ where: { id }, data: entry });
		return queryResult;
	}

	async softDelete({ id }: TDeleteEntryArgs): Promise<void> {
		await this._delegate.update({ where: { id }, data: { isActive: false } });
	}

	async restore({ id }: TRestoreEntryArgs): Promise<Entry> {
		const queryResult = await this._delegate.update({ where: { id }, data: { isActive: true } });
		return queryResult;
	}

	async hardDelete({ id }: TDeleteEntryArgs): Promise<void> {
		await this._delegate.delete({ where: { id } });
	}
}
