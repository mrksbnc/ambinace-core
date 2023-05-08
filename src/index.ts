import dotenv from 'dotenv';
import { server } from './app';
import { logger } from './utils/logger';

(async (): Promise<void> => {
	try {
		dotenv.config();
	} catch (error) {
		const _e: Error = error as Error;
		logger.error(_e.message);
	}

	try {
		server.init();
	} catch (error) {
		const _e: Error = error as Error;
		logger.error(_e.message);
	}
})();
