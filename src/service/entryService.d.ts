import type {
	TUpdateEntryArgs,
	TCreateEntryArgs,
	TGetEntryByIdArgs,
	TSoftDeleteEntryArgs,
	THardDeleteEntryArgs,
	TGetEntriesByMoodArgs,
	TGetEntriesByDateArgs,
	TGetEntriesByUserIdArgs,
	TGetEntriesByDaterangeArgs,
} from '@/types/args';
import type { Entry } from '@prisma/client';
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
