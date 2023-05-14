export enum ERROR_NAME {
	ROUTE_NOT_FOUND = 'RouteNotFoundError',
	INTERNAL = 'InternalServerError',
	INVALID_ARGUMENT = 'InvalidArgumentError',
	INVALID_CONTENT_TYPE = 'InvalidContentTypeError',
	RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
	METHOD_NOT_ALLOWED = 'RequestMethodNotAllowedError',
	INVALID_DATE_RANGE_ARGUMENT = 'InvalidDateRangeArgumentError',
	INVALID_PAYLOAD = 'InvalidPayloadError',
	INVALID_EMAIL_ARGUMENT = 'InvalidEmailArgumentError',
	INVALID_DATE_ARGUMENT = 'InvalidDateArgumentError',
}

export enum ERROR_MESSAGE {
	INVALID_ID = 'Invalid id received from client',
	INTERNAL_SERVVER_ERROR = 'Internal server error',
	INVALID_DATE = 'Invalid date received from client',
	INVALID_ARGUMENT = 'Invalid argument $ received from client',
	RESOURCE_NOT_FOUND = 'The requested resource was not found',
	INVALID_EMAIL_ARGUMENT = 'Invalid email received from client',
	INVALID_DATE_RANGE_ARGUMENT = 'Invalid date range received from client',
	INVALID_PAYLOAD = 'Invalid payload received from client',
}
