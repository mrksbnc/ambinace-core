import type { PrismaClient } from '@prisma/client';

export type TDatabase = {
	initialize(): Promise<void>;
	getDefaultClient(): PrismaClient;
};
