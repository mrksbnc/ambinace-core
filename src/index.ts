import dotenv from 'dotenv';
import Server from './app/server';
import { logger } from './utils/logger';

(async (): Promise<void> => {
	try {
		dotenv.config();
	} catch (error) {
		const _e: Error = error as Error;
		logger.error(_e.message);
	}

	try {
		Server.sharedInstance.init();
	} catch (error) {
		const _e: Error = error as Error;
		logger.error(_e.message);
	}
})();
