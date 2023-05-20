import type { PrismaClient } from '@prisma/client';
/**
 * Interface for the database service. This interface is used to define the
 * database service to connect with Prisma and provide wrapper for some of
 * the Client methods.
 */
export declare type TDatabase = {
	/**
	 * Initializes the database service. (Connects to the database.)
	 */
	initialize(): Promise<void>;
	/**
	 * Returns the default Prisma client for the instance.
	 */
	getDefaultClient(): PrismaClient;
};
