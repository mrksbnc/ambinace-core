import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import type { TMiddleware } from './middleware.d';
import { httpLogMiddleware } from './httpLogMiddleware';
import { type Application, urlencoded, json } from 'express';
import { responseHeaderMiddleware } from './responseHeaderMiddleware';
import { requestMethodValidatorMiddleware } from './requestMethodValidatorMiddleware';

let sharedInstance: Middleware | null = null;

export default class Middleware implements TMiddleware {
	static get sharedInstance(): Middleware {
		if (sharedInstance === null) {
			sharedInstance = new Middleware();
		}
		return sharedInstance;
	}

	public register(app: Application): void {
		this._registerApiMiddlewares(app);
	}

	private _registerApiMiddlewares(app: Application): void {
		app.use(requestMethodValidatorMiddleware);
		app.use(helmet({ hidePoweredBy: true }));
		app.use(hpp());
		app.use(cors());
		app.use(cookieParser());
		app.use(urlencoded({ extended: true }));
		app.use(json({ type: 'application/json' }));
		app.use(httpLogMiddleware);
		app.all('*', responseHeaderMiddleware);
	}
}
