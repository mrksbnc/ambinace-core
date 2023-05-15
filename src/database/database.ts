import Log from '@/utils/logger';
import { PrismaClient } from '@prisma/client';
import type { TDatabase } from './database.d';

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

DEFAULT_PRISMA_CLIENT.$on('warn', (e) => {
	Log.sharedInstance.baseLogger.warn(`prisma warning | ${e.message}`);
});

DEFAULT_PRISMA_CLIENT.$on('error', (e) => {
	Log.sharedInstance.baseLogger.error(`prisma error | ${e.message}`);
});

DEFAULT_PRISMA_CLIENT.$use(async (params, next) => {
	const before = Date.now();
	const result = await next(params);
	const after = Date.now();

	Log.sharedInstance.baseLogger.info(`query |  ${params.model}.${params.action} - ${after - before} ms`);
	return result;
});

let sharedInstance: Database | null = null;
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
