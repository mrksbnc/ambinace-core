import { cleanEnv, str, port, num } from 'envalid';

export const validateEnv = (): void => {
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
};
