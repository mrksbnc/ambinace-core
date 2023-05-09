import type { TRequestMethod } from '@/api';

export enum APP_CONFIG_KEY {
	ENV = 'env',
	NAME = 'name',
	PORT = 'port',
	VERSION = 'version',
}

export const ENABLED_HTTP_REQUEST_METHODS: TRequestMethod[] = ['GET', 'PUT', 'POST', 'DELETE'];

export enum API_CONFIG_KEY {
	BASE_PATH = 'basePath',
	ENABLED_HTTP_REQUEST_METHODS = 'enabledHttpRequestMethods',
}
