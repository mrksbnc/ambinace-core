import type { Application } from 'express';
/**
 * Interface definition for base router class.
 */
export declare interface TRouter {
	/**
	 * Registers routes on the argument express application.
	 */
	register: (app: Application) => void;
}
