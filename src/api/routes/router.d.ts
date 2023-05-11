import type { Application } from 'express';

export type TRoute = {
	readonly path: string;
	readonly router: Router;
};

export type TRouter = {
	registerRoutes: (app: Application) => void;
};
