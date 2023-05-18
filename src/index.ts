import dotenv from 'dotenv';
import Log from './utils/logger';
import Server from './server/server';
import Database from './database/database';
import { cleanEnv, num, port, str } from 'envalid';

(async (): Promise<void> => {
	Log.sharedInstance.baseLogger.info(`****************************************`);
	Log.sharedInstance.baseLogger.info(`* Beginning server initialization process...`);
	Log.sharedInstance.baseLogger.info(`* Process started at ${new Date().toJSON()}`);
	Log.sharedInstance.baseLogger.info(`* NODE_ENV: ${process.env.NODE_ENV}`);
	Log.sharedInstance.baseLogger.info(`* PID: ${process.pid}`);
	Log.sharedInstance.baseLogger.info(`**********************************************`);

	Log.sharedInstance.baseLogger.info('* validating env file...');
	cleanEnv(process.env, {
		PORT: port(),
		NODE_ENV: str(),
		BASE_URL: str(),
		JWT_SECRET: str(),
		DATABASE_URL: str(),
		JWT_EXPIRES_IN: str(),
		JWT_GRACE_PERIOD: str(),
		BCRYPT_SALT_ROUNDS: num(),
	});

	dotenv.config();
	Log.sharedInstance.baseLogger.info('* env file validated and loaded!');
	Log.sharedInstance.baseLogger.info(`**********************************************`);

	try {
		Log.sharedInstance.baseLogger.info('* Trying to initialize database connection...');
		await Database.sharedInstance.getDefaultClient().$connect();
		Log.sharedInstance.baseLogger.info('* Database connection established successfully!');
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
