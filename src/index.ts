import dotenv from 'dotenv';
import Log from './utils/logger';
import Server from './server/server';
import Database from './database/database';
import { cleanEnv, num, port, str } from 'envalid';

(async (): Promise<void> => {
	cleanEnv(process.env, {
		PORT: port(),
		NODE_ENV: str(),
		DATABASE_URL: str(),
		JWT_SECRET: str(),
		JWT_EXPIRES_IN: str(),
		JWT_GRACE_PERIOD: str(),
		BCRYPT_SALT_ROUNDS: num(),
		BASE_URL: str(),
	});

	dotenv.config();
	Log.sharedInstance.baseLogger.info('env file validated and loaded!');

	try {
		await Database.sharedInstance.getDefaultClient().$connect();
		Log.sharedInstance.baseLogger.info('database initialized!');
	} catch (error) {
		Log.sharedInstance.baseLogger.error('failed to initialize database! Process will now exit with code 1', { error });
		process.exit(1);
	}

	try {
		Server.sharedInstance.init();
	} catch (error) {
		Log.sharedInstance.baseLogger.error('failed to initialize server! Process will now exit with code 1', { error });
		process.exit(1);
	}
})();
