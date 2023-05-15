import type { Application } from 'express';

export type TRoute = {
	readonly path: string;
	readonly router: Router;
};
/**
 * Interface definition for base router class.
 */
export type TRouter = {
	/**
	 * Registers routes on the argument express application.
	 */
	register: (app: Application) => void;
};
