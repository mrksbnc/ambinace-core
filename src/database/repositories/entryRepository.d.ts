import type { Mood, Prisma } from '@prisma/client';

export type TFindEntryByIdArgs = {
	id: number;
};

export type TFindEntriesByUserIdArgs = {
	userId: number;
};

export type TFindEntriesByUserIdAndDateArgs = {
	userId: number;
	date: Date;
};

export type TFindEntriesByUserIdAndMoodArgs = {
	userId: number;
	moodId: number;
};

export type TFindEntriesByUserIdAndDateRangeArgs = {
	userId: number;
	startDate: Date;
	endDate: Date;
};

export type TFindEntriesByUserIdArgs = {
	userId: number;
};

export type TCreateEntryArgs = {
	entry: Prisma.EntryCreateInput;
};

export type TUpdateEntryArgs = {
	id: number;
	entry: Prisma.EntryUpdateInput;
};

export type TDeleteEntryArgs = {
	id: number;
};

export type TRestoreEntryArgs = {
	id: number;
};

export type TEntryRepositoryConstructorArgs = {
	delegate: Prisma.EntryDelegate<false>;
};
/**
 * Interface definition for EntryRepository
 */
export interface TEntryRepository {
	/**
	 * Returns a single entry by id or null if entry not found
	 */
	findById({ id }: TFindEntryByIdArgs): Promise<Entry | null>;
	/**
	 * Returns a multiple entry by the user id or empty array if no entries
	 * were found
	 */
	findByUserId({ userId }: TFindEntriesByUserIdArgs): Promise<Entry[]>;
	/**
	 * Returns multiple entries by userId and creation date or empty array if no entries
	 * were found
	 */
	findByUserIdAndDate({ userId, date }: TFindEntriesByUserIdAndDateArgs): Promise<Entry[]>;
	/**
	 * Returns multiple entries by userId and a given mood or empty array if no entries
	 * were found
	 */
	findByUserIdAndMood({ userId, mood }: TFindEntriesByUserIdAndMoodArgs): Promise<Entry[]>;
	/**
	 * Returns multiple entries by userId in a given date range or empty array if no entries
	 * were found
	 *
	 * startDate is inclusive and endDate is exclusive. If no endDate is provided, it will
	 * default to the current date
	 */
	findByUserIdAndDateRange({ userId, startDate, endDate }: TFindEntriesByUserIdAndDateRangeArgs): Promise<Entry[]>;
	/**
	 * Rreturns all the active entries by userId or empty array if no entries
	 * were found
	 */
	findActiveByUserId({ userId }: TFindEntriesByUserIdArgs): Promise<Entry[]>;
	/**
	 * Rreturns all the inactive entries by userId or empty array if no entries
	 * were found
	 */
	findInactiveByUserId({ userId }: TFindEntriesByUserIdArgs): Promise<Entry[]>;
	/**
	 * Creates a new entry and returns it
	 */
	create({ entry }: TCreateEntryArgs): Promise<Entry>;
	/**
	 * Updates an existing entry and returns it
	 */
	update({ entry }: TUpdateEntryArgs): Promise<Entry>;
	/**
	 * Soft deletes an existing entry
	 */
	softDelete({ id }: TDeleteEntryArgs): Promise<void>;
	/**
	 * Restores a soft deleted entry
	 */
	restore({ id }: TRestoreEntryArgs): Promise<Entry>;
	/**
	 * Permanently deletes an entry
	 */
	hardDelete({ id }: TDeleteEntryArgs): Promise<void>;
}
