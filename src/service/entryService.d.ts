import type { Entry, Mood } from '@prisma/client';
/**
 * Arguments for getEntriesByUserId.
 */
export type TGetEntriesByUserIdArgs = {
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
 * @remarks
 * The start date is inclusive, the end date is exclusive.
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/filtering#filtering-by-date
 */
export type TGetEntriesByDaterangeArgs = {
	startDate: Date;
	endDate?: Date | null;
};
/**
 * Arguments for getEntryById.
 */
export type TGetEntryByIdArgs = {
	id: number;
};
/*
 * Arguments for createEntry.
 */
export type TCreateEntryArgs = {
	entry: Entry;
};
/**
 * Arguments for updateEntry.
 */
export type TUpdateEntryArgs = {
	entry: Entry;
};
/**
 * Arguments for softDeleteEntry.
 */
export type TSoftDeleteEntryArgs = {
	id: number;
};
/*
 * Arguments for hardDeleteEntry.
 */
export type THardDeleteEntryArgs = {
	id: number;
};
/**
 * Interface for the entry repository.
 */
export type TEntryService = {
	/**
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
	 * Returns all entries with a given mood.
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
	 * Returns an entry by its id.
	 */
	getEntryById: (args: TGetEntryByIdArgs) => Promise<Entry | null>;
	/**
	 * Creates a new entry.
	 */
	createEntry: (args: TCreateEntryArgs) => Promise<Entry>;
	/**
	 * Updates an entry.
	 */
	updateEntry: (args: TUpdateEntryArgs) => Promise<Entry>;
	/**
	 * Soft-deletes an entry. (Sets isActive to false)
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
