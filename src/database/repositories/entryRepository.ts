import type {
	TCreateEntryArgs,
	TDeleteEntryArgs,
	TEntryRepository,
	TUpdateEntryArgs,
	TRestoreEntryArgs,
	TFindEntryByIdArgs,
	TFindEntriesByUserIdArgs,
	TFindEntriesByUserIdAndMoodArgs,
	TFindEntriesByUserIdAndDateArgs,
	TEntryRepositoryConstructorArgs,
	TFindEntriesByUserIdAndDateRangeArgs,
} from './entryRepository.d';
import Database from '../database';
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

	async findById({ id }: TFindEntryByIdArgs): Promise<Entry | null> {
		const queryResult = await this._delegate.findUnique({ where: { id }, rejectOnNotFound: false });
		return queryResult;
	}

	async findByUserId({ userId }: TFindEntriesByUserIdArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId } });
		return queryResult;
	}

	async findByUserIdAndDate({ userId, date }: TFindEntriesByUserIdAndDateArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, createdAt: date } });
		return queryResult;
	}

	async findByUserIdAndDateRange({
		userId,
		startDate,
		endDate,
	}: TFindEntriesByUserIdAndDateRangeArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({
			where: { userId, createdAt: { gte: startDate, lte: endDate } },
		});

		return queryResult;
	}

	async findByUserIdAndMood({ userId, moodId }: TFindEntriesByUserIdAndMoodArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, moodId } });
		return queryResult;
	}

	async findActiveByUserId({ userId }: TFindEntriesByUserIdArgs): Promise<Entry[]> {
		const queryResult = await this._delegate.findMany({ where: { userId, isActive: true } });
		return queryResult;
	}

	async findInactiveByUserId({ userId }: TFindEntriesByUserIdArgs): Promise<Entry[]> {
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
