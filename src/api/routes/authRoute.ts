import { Router } from 'express';
import type { TRoute } from './router.d';
import AuthController from '../controllers/authController';
import type { TAuthRouteConstructorArgs } from './authRoute.d';
import type { TAuthController } from '../controllers/authController.d';

let sharedInstance: AuthRoute | null = null;

export default class AuthRoute implements TRoute {
	private readonly _authController: TAuthController;

	static get sharedInstance(): AuthRoute {
		if (sharedInstance === null) {
			sharedInstance = new AuthRoute({
				authController: AuthController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/auth';
	public readonly router: Router;

	public constructor({ authController }: TAuthRouteConstructorArgs) {
		this._authController = authController;

		const r = Router();
		this.router = this._register(r);
	}

	private _concatSegment(segment: string): string {
		return `${this.path}/${segment}`;
	}

	private _register(router: Router): Router {
		router.post(this._concatSegment('login'), this._authController.login);
		router.post(this._concatSegment('register'), this._authController.register);

		return router;
	}
}
