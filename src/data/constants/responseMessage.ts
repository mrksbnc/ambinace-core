export enum RESPONSE_ERROR_MESSAGE {
	ROUTE_NOT_FOUND = 'Route Not Found',
	INVALID_CONTENT_TYPE = 'Invalid Content-Type',
	INTERNAL_SERVER_ERROR = 'Internal Server Error',
	METHOD_NOT_ALLOWED = 'Request Method Not Allowed',
	UNAUTHORIZED = 'Unauthorized',
	MISSING_AUTHORIZATION_HEADER = 'Missing Authorization Header',
	INVALID_PAYLOAD = 'Invalid payload received from client',
	INVALID_EMAIL_ARGUMENT = 'Invalid email received from client',
	INVALID_DATE_RANGE_ARGUMENT = 'Invalid date range received from client',
	INVALID_DATE_ARGUMENT = 'Invalid date received from client',
	INVALID_ARGUMENT = 'Invalid argument received from client',
}
