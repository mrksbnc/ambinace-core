import type { Router } from 'express';
import AppConfig from '@/config/appConfig';
import type { TRouteControllerKey, TRouteMeta, TRouteMetaConstructorArgs } from './route.d';

export default class RouteMeta implements TRouteMeta {
	public readonly method: string;
	public readonly controller: TRouteControllerKey;
	public readonly path: string;
	public readonly fullPath: string;
	public readonly __handler: (
		router: Router,
		path: string,
	) => ReturnType<Router['get'] | Router['post'] | Router['put'] | Router['delete']>;

	constructor({ method, controller, path, __handler }: TRouteMetaConstructorArgs) {
		this.path = path;
		this.method = method;
		this.controller = controller;
		this.fullPath = `${AppConfig.sharedInstance.api.basePath}${path}`;
		this.__handler = __handler;
	}
}
