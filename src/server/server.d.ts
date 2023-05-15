import type { Application } from 'express';
/**
 * Interface definition for the application server.
 */
export interface TServer {
	/**
	 * Returns the express application from the
	 * server instance.
	 */
	get: () => Application;
	/**
	 * Initializes and starts the server.
	 */
	init: () => Promise<void>;
}
