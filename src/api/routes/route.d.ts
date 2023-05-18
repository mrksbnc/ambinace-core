import type { IRouterMatcher, Router } from 'express';
/**
 * Available Controller keys for the meta.controller property defined in TRouteMetaData
 * Used to define the controller that handles the route
 */
export declare type TRouteControllerKey =
	| 'moodController'
	| 'authController'
	| 'userController'
	| 'entryController'
	| 'activityController';
/**
 * Interface definition for the meta data of a route
 *
 * Route meta data used to define the behavior of the given route
 * and enable more detailed logging
 */
export declare interface TRouteMeta {
	path: string;
	fullPath: string;
	method: IRouterMatcher;
	controller: TRouteControllerKey;
	__handler: (
		router: Router,
		path: string,
	) => ReturnType<Router['get'] | Router['post'] | Router['put'] | Router['delete']>;
}
/**
 * Type definition for the constructor arguments for the meta data
 * class
 */
export declare type TRouteMetaConstructorArgs = {
	path: string;
	method: IRouterMatcher;
	controller: TRouteControllerKey;
	__handler: (
		router: Router,
		path: string,
	) => ReturnType<Router['get'] | Router['post'] | Router['put'] | Router['delete']>;
};
/**
 * Interface defintion for the a standard API route
 */
export declare interface TRoute {
	path: string;
	router: Router;
	metaLogs: string[];
}
/**
 * Interface definition for the constructor arguments for a standard API route
 */
export declare type TRouteConstructorArgs<T> = {
	controller: T;
};
