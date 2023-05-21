import dotenv from 'dotenv';
import Log from './utils/logger';
import Server from './server/server';
import Database from './database/database';
import { cleanEnv, num, port, str } from 'envalid';
import CacheService from './services/cacheService';
import type { TInitProcessStep } from './app';

function handleErrorExit(error: unknown, module: TInitProcessStep): void {
	Log.sharedInstance.baseLogger.error(`failed to initialize ${module}! Process will now exit with code 1`, { error });
	process.exit(1);
}

(async (): Promise<void> => {
	const start = performance.now();

	Log.sharedInstance.createInfoMessageBlock([
		'Beginning server initialization process...',
		'',
		`Process started at ${new Date().toJSON()}`,
		'',
		`NODE_ENV: ${process.env.NODE_ENV}`,
		'',
		`PID: ${process.pid}`,
	]);

	Log.sharedInstance.createInfoMessageBlock(['', 'validating env file...', '']);

	dotenv.config();

	cleanEnv(process.env, {
		PORT: port(),
		NODE_ENV: str(),
		BASE_URL: str(),
		CACHE_TTL: num(),
		REDIS_HOST: str(),
		JWT_SECRET: str(),
		REDIS_PORT: port(),
		DATABASE_URL: str(),
		REDIS_PASSWORD: str(),
		REDIS_USERNAME: str(),
		JWT_EXPIRES_IN: str(),
		JWT_GRACE_PERIOD: str(),
		REDIS_CACHE_NAME: str(),
		BCRYPT_SALT_ROUNDS: num(),
	});

	Log.sharedInstance.createInfoMessageBlock(['', 'env file validated and loaded ', '']);

	try {
		Log.sharedInstance.createInfoMessageBlock(['', 'Trying to establish database connection...', '']);

		await Database.sharedInstance.getDefaultClient().$connect();

		Log.sharedInstance.createInfoMessageBlock(['', 'Database connection established successfully ', '']);
	} catch (error) {
		handleErrorExit(error, 'db');
	}

	try {
		Log.sharedInstance.createInfoMessageBlock(['', 'Trying to establish redis connection...', '']);

		await CacheService.sharedInstance.init();

		Log.sharedInstance.createInfoMessageBlock(['', 'Redis connection established successfully ', '']);
	} catch (error) {
		handleErrorExit(error, 'cache');
	}

	try {
		Server.sharedInstance.init();
	} catch (error) {
		handleErrorExit(error, 'server');
	}

	Log.sharedInstance.createInfoMessageBlock([
		'Server initialization process completed ',
		'',
		`Process completed in ${(performance.now() - start).toPrecision(5)}ms`,
	]);
	Log.sharedInstance.createBlockSeparator();
})();
