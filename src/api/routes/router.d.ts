import type { Application } from 'express';
/**
 * Interface definition for base router class.
 */
export type TRouter = {
	/**
	 * Registers routes on the argument express application.
	 */
	register: (app: Application) => void;
};
