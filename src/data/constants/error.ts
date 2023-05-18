export enum ERROR_NAME {
	INTERNAL = 'InternalServerError',
	ROUTE_NOT_FOUND = 'RouteNotFoundError',
	INVALID_PAYLOAD = 'InvalidPayloadError',
	INVALID_ARGUMENT = 'InvalidArgumentError',
	RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
	INVALID_DATE_ARGUMENT = 'InvalidArgumentError',
	INVALID_CREDENTIALS = 'InvalidCredentialsError',
	INVALID_CONTENT_TYPE = 'InvalidContentTypeError',
	METHOD_NOT_ALLOWED = 'RequestMethodNotAllowedError',
	INVALID_EMAIL_ARGUMENT = 'InvalidEmailArgumentError',
	INVALID_DATE_RANGE_ARGUMENT = 'InvalidDateRangeArgumentError',
}

export enum ERROR_MESSAGE {
	INVALID_ID = 'Invalid id received from client',
	INTERNAL_SERVVER_ERROR = 'Internal server error',
	INVALID_DATE = 'Invalid date received from client',
	INVALID_PAYLOAD = 'Invalid payload received from client',
	RESOURCE_NOT_FOUND = 'The requested resource was not found',
	INVALID_ARGUMENT = 'Invalid argument $ received from client',
	INVALID_EMAIL_ARGUMENT = 'Invalid email received from client',
	INVALID_DATE_RANGE_ARGUMENT = 'Invalid date range received from client',
}

export enum RESPONSE_ERROR_MESSAGE {
	UNAUTHORIZED = 'Unauthorized',
	ROUTE_NOT_FOUND = 'Route Not Found',
	INVALID_CREDENTIALS = 'Invalid credentials',
	INVALID_CONTENT_TYPE = 'Invalid Content-Type',
	INTERNAL_SERVER_ERROR = 'Internal Server Error',
	METHOD_NOT_ALLOWED = 'Request Method Not Allowed',
	INVALID_PAYLOAD = 'Invalid payload received from client! $',
	INVALID_DATE_ARGUMENT = 'Invalid date received from client',
	RESOURCE_NOT_FOUND = 'The requested resource was not found',
	INVALID_ARGUMENT = 'Invalid argument $ received from client',
	MISSING_AUTHORIZATION_HEADER = 'Missing Authorization Header',
	INVALID_EMAIL_ARGUMENT = 'Invalid email received from client',
	INVALID_DATE_RANGE_ARGUMENT = 'Invalid date range received from client',
}
