export enum ERROR_NAME {
	ROUTE_NOT_FOUND = 'Route Not Found',
	INVALID_CONTENT_TYPE = 'Invalid Content-Type',
	INTERNAL_SERVER_ERROR = 'Internal Server Error',
	METHOD_NOT_ALLOWED = 'Request Method Not Allowed',
	INVALID_ARGUMENT_ERROR = 'Invalid Argument Error',
}

export enum ERROR_MESSAGE {
	TOKEN_EXPIRED = 'Access token expired',
	INTERNAL_SERVVER_ERROR = 'Internal server error',
	REQUEST_METHOD_NOT_ALLOWED = 'Request method not allowed',
	ROUTE_NOT_FOUND = 'The requested path could not be found',
	INVALID_ARGUMENT = 'Invalid argument received from client',
	RESOURCE_NOT_FOUND = 'The requested resource was not found',
	INVALID_NUMERIC_ID = 'Invalid numeric id received from client',
	RESOURCE_ALREADY_EXISTS = 'Resource already exists in database',
	TOKEN_NOT_FOUND = 'Access token missing from the request header',
	INVALID_AUTH_TOKEN = 'Invalid authentication token received from client',
	UNAUTHORIZED = 'Authentication is required to access the requested resource',
	INVALID_CONTENT_TYPE = 'Invalid content type, server requires application/json',
}
