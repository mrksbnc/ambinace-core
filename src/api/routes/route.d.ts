import type { Router } from 'express';

export interface TRoute {
	path: string;
	router: Router;
}

export type TRouteConstructorArgs<T> = {
	controller: T;
};
