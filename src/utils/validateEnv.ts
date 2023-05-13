import { cleanEnv, str, port } from 'envalid';

export const validateEnv = (): void => {
	cleanEnv(process.env, {
		PORT: port(),
		NODE_ENV: str(),
		DATABASE_URL: str(),
		JWT_SECRET: str(),
		BASE_PATH: str(),
	});
};
