import type { Router } from 'express';

export type Route = {
	readonly path: string;
	readonly router: Router;
};

export type Routes = Route[];
