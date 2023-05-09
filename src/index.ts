import dotenv from 'dotenv';
import Server from './app/server';
import { logger } from './utils/logger';
import Database from './database/database';
import { validateEnv } from './utils/validateEnv';

(async (): Promise<void> => {
	validateEnv();

	dotenv.config();
	logger.info('.env file loaded!');

	try {
		await Database.sharedInstance.initialize();
		logger.info('database initialized!');
	} catch (error) {
		logger.fatal('failed to initialize database! Process will now exit with code 1', error);
		process.exit(1);
	}

	try {
		Server.sharedInstance.init();
	} catch (error) {
		logger.fatal('failed to initialize server! Process will now exit with code 1', error);
		process.exit(1);
	}
})();
