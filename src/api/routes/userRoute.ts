import { Router } from 'express';
import UserController from '../controllers/userController';
import type { TRoute, TRouteConstructorArgs } from './route.d';
import type { TUserController } from '../controllers/userController.d';

let sharedInstance: UserRoute | null = null;

export default class UserRoute implements TRoute {
	private readonly _userController: TUserController;

	static get sharedInstance(): UserRoute {
		if (sharedInstance === null) {
			sharedInstance = new UserRoute({
				controller: UserController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/user';
	public readonly router: Router;

	public constructor({ controller }: TRouteConstructorArgs<TUserController>) {
		this._userController = controller;

		const r = Router();
		this.router = this._register(r);
	}

	private _concatSegment(segment: string): string {
		return `${this.path}/${segment}`;
	}

	private _register(router: Router): Router {
		/**
		 * TODO: Add authentication middleware.
		 */
		router.get(this._concatSegment('get/:id'), this._userController.get);
		router.post(this._concatSegment('get/many'), this._userController.getMany);
		router.put(this._concatSegment('update/:id'), this._userController.update);
		router.put(this._concatSegment('delete/soft/:id'), this._userController.softDelete);
		router.put(this._concatSegment('restore/:id'), this._userController.softDelete);
		router.delete(this._concatSegment('delete/:id'), this._userController.hardDelete);

		return router;
	}
}
