import { logger } from '@/utils/logger';
import type { TServer } from './server.d';
import { appConfig } from '@/config/app.config';
import express, { type Application } from 'express';

export default class Server implements TServer {
	private readonly _name: string;
	private readonly _version: string;
	private readonly _app: Application;

	constructor() {
		this._app = express();
		this._name = appConfig.name;
		this._version = appConfig.version;
	}

	public get(): Application {
		return this._app;
	}

	public async init(): Promise<void> {
		this._app.listen(appConfig.port, () => {
			logger.info(`${this._name} v${this._version} is running on port ${appConfig.port}`);
		});
	}
}
