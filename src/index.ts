import dotenv from 'dotenv';
import Log from './utils/logger';
import Server from './server/server';
import Database from './database/database';
import { cleanEnv, num, port, str } from 'envalid';

(async (): Promise<void> => {
	const start = performance.now();

	Log.sharedInstance.createInfoMessageBlock([
		'Beginning server initialization process...',
		`Process started at ${new Date().toJSON()}`,
		`NODE_ENV: ${process.env.NODE_ENV}`,
		`PID: ${process.pid}`,
	]);

	Log.sharedInstance.createInfoMessageBlock('validating env file...');
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
	Log.sharedInstance.createInfoMessageBlock('env file validated and loaded!');

	try {
		Log.sharedInstance.createInfoMessageBlock(['Trying to establish database connection...']);

		await Database.sharedInstance.getDefaultClient().$connect();

		Log.sharedInstance.createInfoMessageBlock(['Database connection established successfully!']);
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

	const end = performance.now() - start;
	Log.sharedInstance.createInfoMessageBlock([
		'Server initialization process completed!',
		`Process completed in ${end}ms`,
	]);
	Log.sharedInstance.createBlockSeparator();
})();
