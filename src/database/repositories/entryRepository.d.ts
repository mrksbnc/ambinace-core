import type { Entry, Mood } from '@prisma/client';
/**
 * Arguments for getEntriesByUserId.
 */
export type TGetEntriesByUserIdArgs = {
	/**
	 * Supabase user id.
	 */
	userId: number;
};
/**
 * Arguments for getEntriesByDate.
 */
export type TGetEntriesByDateArgs = {
	date: Date;
};
/**
 * Arguments for getEntriesByMood.
 */
export type TGetEntriesByMoodArgs = {
	mood: Mood;
};
/**
 * Arguments for getEntriesByDaterange.
 */
export type TGetEntriesByDaterangeArgs = {
	startDate: Date;
	endDate: Date;
};
/**
 * Arguments for getEntryById.
 */
export type TGetEntryByIdArgs = {
	id: number;
};
/**
 * Arguments for createEntry.
 */
export type TCreateEntryArgs = {
	entry: Entry;
};
/**
 * Arguments for updateEntry.
 */
export type TUpdateEntryArgs = {
	id: number;
	entry: Entry;
};
/**
 * Arguments for softDeleteEntry.
 */
export type TSoftDeleteEntryArgs = {
	id: number;
};
/**
 * Hard-deletes an Entry
 * @remarks
 * This is not recommended, use softDeleteEntry instead.
 * @see softDeleteEntry
 */
export type THardDeleteEntryArgs = {
	id: number;
};
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
