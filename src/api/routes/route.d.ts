import type { IRouterMatcher, Router } from 'express';
/**
 * Available Controller keys for the meta.controller property defined in TRouteMetaData
 * Used to define the controller that handles the route
 */
export type TRouteControllerKey =
	| 'MoodController'
	| 'AuthController'
	| 'UserController'
	| 'EntryController'
	| 'ActivityController';
/**
 * Route meta data used to define the route and the controller that handles the route
 * with the appropriate method
 */
export type TRouteMetaData = {
	path: string;
	fullPath: string;
	method: IRouterMatcher;
	controller: TRouteControllerKey;
	__handler: (router: Router) => ReturnType<Router['get'] | Router['post'] | Router['put'] | Router['delete']>;
};
/**
 * Interface defintion for the a standard API route
 */
export interface TRoute {
	path: string;
	router: Router;
	meta: TRouteMetaData[];
}
/**
 * Interface definition for the constructor arguments for a standard API route
 */
export type TRouteConstructorArgs<T> = {
	controller: T;
};
