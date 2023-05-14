import type { TEntryRepository } from '@/database/repositories/entryRepository';

export type TGetEntryByIdServiceArgs = {
	id: number;
};

export type TGetEntriesByUserIdServiceArgs = {
	userId: number;
};

export type TGetEntriesByUserIdAndDateServiceArgs = {
	userId: number;
	date: Date;
};

export type TGetEntriesByUserIdAndMoodServiceArgs = {
	userId: number;
	mood: Mood;
};

export type TGetEntriesByUserIdAndDateRangeServiceArgs = {
	userId: number;
	startDate: Date;
	endDate?: Date;
};

export type TCreateEntryServiceArgs = {
	entry: Prisma.EntryCreateInput;
};

export type TUpdateEntryServiceArgs = {
	id: number;
	entry: Prisma.EntryUpdateInput;
};

export type TDeleteEntryServiceArgs = {
	id: number;
};

export type TRestoreEntryServiceArgs = {
	id: number;
};

export type TEntryServiceConstructorArgs = {
	repository: TEntryRepository;
};
/**
 * Interface definition for EntryServices
 */
export interface TEntryService {
	/**
	 * Uses the dependency injected repository to return a single entry by id or null if
	 * the entry not found
	 *
	 * @throws InvalidNumericArgumentError if the id is not a valid numeric id
	 */
	getById({ id }: TGetEntryByIdServiceArgs): Promise<Entry | null>;
	/**
	 * Uses the dependency injected repository to return multiple entries by userId or empty
	 * array if no entries were found
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 */
	getByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]>;
	/**
	 * Uses the dependency injected repository to return a multiple entries by userId and date
	 * or empty array if no entries were found
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 * @throws InvalidDateArgumentError if the date is not a valid past or now date
	 */
	getByUserIdAndDate({ userId, date }: TGetEntriesByUserIdAndDateServiceArgs): Promise<Entry[]>;
	/**
	 * Uses the dependency injected repository to return a multiple entries by userId and mood
	 * or empty array if no entries were found
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 */
	getByUserIdAndMood({ userId, mood }: TGetEntriesByUserIdAndMoodServiceArgs): Promise<Entry[]>;
	/**
	 * Uses the dependency injected repository to return a multiple entries by userId and date
	 * range or empty array if no entries were found
	 *
	 * startDate is inclusive and endDate is exclusive. If no endDate is provided, it will
	 * default to the current date
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 * @throws InvalidDateArgumentError if the startDate or endDate are not valid past or now dates
	 * @throws InvalidDateRangeArgumentError if the startDate is greater than the endDate
	 */
	getByUserIdAndDateRange({ userId, startDate, endDate }: TGetEntriesByUserIdAndDateRangeServiceArgs): Promise<Entry[]>;
	/**
	 * Uses the dependency injected repository to return all the active entries by userId or
	 * empty array if no entries were found
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 */
	getActiveByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]>;
	/**
	 * Uses the dependency injected repository to return all the inactive entries by userId or
	 * empty array if no entries were found
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 */
	getInactiveByUserId({ userId }: TGetEntriesByUserIdServiceArgs): Promise<Entry[]>;
	/**
	 * Uses the dependency injected repository to create a new entry and returns it
	 */
	create({ entry }: TCreateEntryServiceArgs): Promise<Entry>;
	/**
	 * Uses the dependency injected repository to update an existing entry and returns it
	 *
	 * @throws InvalidNumericArgumentError if the userId is not a valid numeric id
	 */
	update({ entry }: TUpdateEntryServiceArgs): Promise<Entry>;
	/**
	 * Uses the dependency injected repository to soft delete an entry
	 *
	 * @throws InvalidNumericArgumentError if the id is not a valid numeric id
	 */
	softDelete({ id }: TDeleteEntryServiceArgs): Promise<void>;
	/**
	 * Uses the dependency injected repository to restore a soft deleted entry
	 *
	 * @throws InvalidNumericArgumentError if the id is not a valid numeric id
	 */
	restore({ id }: TRestoreEntryServiceArgs): Promise<Entry>;
	/**
	 * Uses the dependency injected repository to permanently delete an entry
	 *
	 * @throws InvalidNumericArgumentError if the id is not a valid numeric id
	 */
	hardDelete({ id }: TDeleteEntryServiceArgs): Promise<void>;
}
