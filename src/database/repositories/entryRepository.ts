import type { TEntryRepository } from './entryRepository.d';
import type { Entry, Mood, PrismaClient } from '@prisma/client';

export default class EntryReposiory implements TEntryRepository {
	private readonly _client: PrismaClient;

	constructor(client: PrismaClient) {
		this._client = client;
	}

	public async getEntries(): Promise<Entry[]> {
		const queryResult = await this._client.entry.findMany();
		return queryResult;
	}

	public async getEntriesByUserId(userId: number): Promise<Entry[]> {
		const queryResult = await this._client.entry.findMany({ where: { createdBy: userId } });
		return queryResult;
	}

	public async getEntriesByDate(date: Date): Promise<Entry[]> {
		const queryResult = await this._client.entry.findMany({ where: { createdAt: date } });
		return queryResult;
	}

	public async getEntriesByMood(mood: Mood): Promise<Entry[]> {
		const queryResult = await this._client.entry.findMany({ where: { mood } });
		return queryResult;
	}

	public async getEntriesByDaterange(startDate: Date, endDate: Date): Promise<Entry[]> {
		const queryResult = await this._client.entry.findMany({ where: { createdAt: { gte: startDate, lte: endDate } } });
		return queryResult;
	}

	public async getActiveEntries(): Promise<Entry[]> {
		const queryResult = await this._client.entry.findMany({ where: { isActive: true } });
		return queryResult;
	}

	public async getEntryById(id: number): Promise<Entry | null> {
		const queryResult = await this._client.entry.findUnique({ where: { id } });
		return queryResult;
	}

	public async createEntry(entry: Entry): Promise<Entry> {
		const queryResult = await this._client.entry.create({ data: entry });
		return queryResult;
	}

	public async updateEntry(entry: Entry): Promise<Entry> {
		const queryResult = await this._client.entry.update({ where: { id: entry.id }, data: entry });
		return queryResult;
	}

	public async softDeleteEntry(id: number): Promise<void> {
		await this._client.entry.update({ where: { id }, data: { isActive: false } });
	}

	public async hardDeleteEntry(id: number): Promise<void> {
		await this._client.entry.delete({ where: { id } });
	}
}
