import type { Entry, Mood } from '@prisma/client';

export type TEntryRepository = {
	getEntries: () => Promise<Entry[]>;
	getEntriesByUserId: (userId: number) => Promise<Entry[]>;
	getEntriesByDate: (date: Date) => Promise<Entry[]>;
	getEntriesByMood: (mood: Mood) => Promise<Entry[]>;
	getEntriesByDaterange: (startDate: Date, endDate: Date) => Promise<Entry[]>;
	getActiveEntries: () => Promise<Entry[]>;
	getEntryById: (id: number) => Promise<Entry | null>;
	createEntry: (entry: Entry) => Promise<Entry>;
	updateEntry: (entry: Entry) => Promise<Entry>;
	softDeleteEntry: (id: number) => Promise<void>;
	hardDeleteEntry: (id: number) => Promise<void>;
};
