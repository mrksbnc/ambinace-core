import type { Entry } from '@prisma/client';
/**
 * Entry repository interface.
 * @remarks
 * This interface is used to abstract the database layer from the application layer.
 * @see EntryRepository
 */
export type TEntryRepository = {
	/*
	 * Returns all entries.
	 */
	getEntries: () => Promise<Entry[]>;
	/**
	 * Returns all entries created by a user.
	 */
	getEntriesByUserId: (args: TGetEntriesByUserIdArgs) => Promise<Entry[]>;
	/**
	 * Returns all entries created on a date.
	 */
	getEntriesByDate: (args: TGetEntriesByDateArgs) => Promise<Entry[]>;
	/**
	 * Returns all entries with a mood.
	 */
	getEntriesByMood: (args: TGetEntriesByMoodArgs) => Promise<Entry[]>;
	/**
	 * Returns all entries created between two dates.
	 */
	getEntriesByDaterange: (args: TGetEntriesByDaterangeArgs) => Promise<Entry[]>;
	/**
	 * Returns all active entries.
	 */
	getActiveEntries: () => Promise<Entry[]>;
	/**
	 * Returns an entry by id.
	 */
	getEntryById: (args: TGetEntryByIdArgs) => Promise<Entry | null>;
	/**
	 * Creates an entry.
	 */
	createEntry: (args: TCreateEntryArgs) => Promise<Entry>;
	/**
	 * Updates an entry.
	 */
	updateEntry: (args: TUpdateEntryArgs) => Promise<Entry>;
	/**
	 * Soft-deletes an entry.
	 * @remarks
	 * This is the recommended way of deleting entries.
	 */
	softDeleteEntry: (args: TSoftDeleteEntryArgs) => Promise<void>;
	/**
	 * Hard-deletes an entry.
	 * @remarks
	 * This is not recommended, use softDeleteEntry instead.
	 * @see softDeleteEntry
	 */
	hardDeleteEntry: (args: THardDeleteEntryArgs) => Promise<void>;
};
