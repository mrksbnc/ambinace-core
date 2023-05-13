import { prismaMock } from './mock/singleton';
import { type Entry, Mood } from '@prisma/client';
import EntrRepository from '../database/repositories/entryRepository';

const mockRepository = new EntrRepository(prismaMock.entry);

const expectedSingle: Entry = {
	id: 1,
	notes: 'Test Notes 1',
	createdAt: new Date('2021-01-01T00:00:00.000Z'),
	updatedAt: new Date('2021-01-01T00:00:00.000Z'),
	isActive: false,
	userId: 1,
	mood: Mood.GOOD,
};

const expectedMultiple: Entry[] = [
	{
		id: 1,
		notes: 'Test Notes 1',
		createdAt: new Date('2021-01-01T00:00:00.000Z'),
		updatedAt: new Date('2021-01-01T00:00:00.000Z'),
		isActive: false,
		userId: 1,
		mood: Mood.GOOD,
	},
	{
		id: 2,
		notes: 'Test Notes 2',
		createdAt: new Date('2021-01-01T00:00:00.000Z'),
		updatedAt: new Date('2021-01-01T00:00:00.000Z'),
		isActive: false,
		userId: 1,
		mood: Mood.GOOD,
	},
];

describe('Entry Repository', () => {
	describe('getEntries', () => {
		it('should return all entries', async () => {
			prismaMock.entry.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getEntries();

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.entry.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getEntriesByUserId', () => {
		it('should return all entries created by a user', async () => {
			prismaMock.entry.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getEntriesByUserId({ userId: 1 });

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.entry.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getEntriesByDate', () => {
		it('should return all entries created on a date', async () => {
			prismaMock.entry.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getEntriesByDate({ date: new Date('2021-01-01T00:00:00.000Z'), userId: 1 });

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.entry.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getEntriesByMood', () => {
		it('should return all entries with a mood', async () => {
			prismaMock.entry.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getEntriesByMood({ mood: Mood.GOOD, userId: 1 });

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.entry.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getEntriesByDaterange', () => {
		it('should return all entries created between two dates', async () => {
			prismaMock.entry.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getEntriesByDaterange({
				startDate: new Date('2021-01-01T00:00:00.000Z'),
				endDate: new Date('2021-01-01T00:00:00.000Z'),
				userId: 1,
			});

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.entry.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getActiveEntries', () => {
		it('should return all active entries', async () => {
			prismaMock.entry.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getActiveEntries({ userId: 1 });

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.entry.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getEntryById', () => {
		it('should return a single entry', async () => {
			prismaMock.entry.findUnique.mockResolvedValue(expectedSingle);

			const result = await mockRepository.getEntryById({ id: 1 });

			expect(result).toEqual(expectedSingle);
			expect(prismaMock.entry.findUnique).toHaveBeenCalledTimes(1);
		});
	});

	describe('createEntry', () => {
		it('should create a new entry', async () => {
			prismaMock.entry.create.mockResolvedValue(expectedSingle);

			const result = await mockRepository.createEntry({ entry: expectedSingle });

			expect(result).toEqual(expectedSingle);
			expect(prismaMock.entry.create).toHaveBeenCalledTimes(1);
		});
	});

	describe('updateEntry', () => {
		it('should update an existing entry', async () => {
			prismaMock.entry.update.mockResolvedValue(expectedSingle);

			const result = await mockRepository.updateEntry({ id: 1, entry: expectedSingle });

			expect(result).toEqual(expectedSingle);
			expect(prismaMock.entry.update).toHaveBeenCalledTimes(1);
		});
	});

	describe('softDeleteEntry', () => {
		it('should soft delete an existing entry', async () => {
			prismaMock.entry.update.mockResolvedValue(expectedSingle);

			const result = await mockRepository.softDeleteEntry({ id: 1 });

			expect(prismaMock.entry.update).toHaveBeenCalledTimes(1);
			expect(result).toBeUndefined();
		});
	});

	describe('hardDeleteEntry', () => {
		it('should hard delete an existing entry', async () => {
			prismaMock.entry.delete.mockResolvedValue(expectedSingle);

			const result = await mockRepository.hardDeleteEntry({ id: 1 });

			expect(prismaMock.entry.delete).toHaveBeenCalledTimes(1);
			expect(result).toBeUndefined();
		});
	});
});
