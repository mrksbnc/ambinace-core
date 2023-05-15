import type { Application } from 'express';
/**
 * Interface definition for base middleware class.
 */
export interface TMiddleware {
	/**
	 * Registers middleware on the argument express application.
	 */
	register(app: Application): void;
}
