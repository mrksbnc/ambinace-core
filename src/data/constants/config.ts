import type { TRequestMethod } from '@/api';

export enum APP_CONFIG_KEY {
	ENV = 'env',
	NAME = 'name',
	PORT = 'port',
	VERSION = 'version',
}

export enum API_CONFIG_KEY {
	BASE_URL = 'basePath',
	ENABLED_HTTP_REQUEST_METHODS = 'enabledHttpRequestMethods',
}

export enum AUTH_CONFIG_KEY {
	JWT_SECRET = 'jwtSecret',
	JWT_EXPIRES_IN = 'jwtExpiresIn',
	JWT_GRACE_PERIOD = 'jwtGracePeriod',
	SALT_ROUNDS = 'saltRounds',
}

export const ENABLED_HTTP_REQUEST_METHODS: TRequestMethod[] = ['GET', 'PUT', 'POST', 'DELETE'];
