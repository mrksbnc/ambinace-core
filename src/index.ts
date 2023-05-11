import dotenv from 'dotenv';
import Log from './utils/logger';
import Server from './server/server';
import Database from './database/database';
import { validateEnv } from './utils/validateEnv';

(async (): Promise<void> => {
	validateEnv();

	dotenv.config();
	Log.sharedInstance.baseLogger.info('.env file loaded!');

	try {
		await Database.sharedInstance.getDefaultClient().$connect();
		Log.sharedInstance.baseLogger.info('database initialized!');
	} catch (error) {
		Log.sharedInstance.baseLogger.fatal('failed to initialize database! Process will now exit with code 1', error);
		process.exit(1);
	}

	try {
		Server.sharedInstance.init();
	} catch (error) {
		Log.sharedInstance.baseLogger.fatal('failed to initialize server! Process will now exit with code 1', error);
		process.exit(1);
	}
})();
