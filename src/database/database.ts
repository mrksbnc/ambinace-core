import { logger } from '@/utils/logger';
import { PrismaClient } from '@prisma/client';
import type { TDatabase } from './database.d';

let sharedInstance: Database | null = null;

const DEFAULT_PRISMA_CLIENT = new PrismaClient({
	log: [
		{
			emit: 'event',
			level: 'query',
		},
		{
			emit: 'event',
			level: 'warn',
		},
		{
			emit: 'event',
			level: 'error',
		},
	],
	errorFormat: 'pretty',
});

DEFAULT_PRISMA_CLIENT.$on('query', (e) => {
	logger.info(`query on | ${e.target} | duration: ${e.duration}ms`);
});

DEFAULT_PRISMA_CLIENT.$on('warn', (e) => {
	logger.warn(`prisma warning | ${e.message}`);
});

DEFAULT_PRISMA_CLIENT.$on('error', (e) => {
	logger.error(`prisma error | ${e.message}`);
});

export default class Database implements TDatabase {
	public static get sharedInstance(): Database {
		if (sharedInstance === null) {
			sharedInstance = new Database(DEFAULT_PRISMA_CLIENT);
		}
		return sharedInstance;
	}

	private readonly _defaultClient: PrismaClient;

	constructor(client: PrismaClient) {
		this._defaultClient = client;
	}

	public async initialize(): Promise<void> {
		await this._defaultClient.$connect();
	}

	public getDefaultClient(): PrismaClient {
		return this._defaultClient;
	}
}
