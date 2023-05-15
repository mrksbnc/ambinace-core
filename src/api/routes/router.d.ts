import type { Application, Router } from 'express';

export interface TRoute {
	path: string;
	router: Router;
}
/**
 * Interface definition for base router class.
 */
export type TRouter = {
	/**
	 * Registers routes on the argument express application.
	 */
	register: (app: Application) => void;
};
