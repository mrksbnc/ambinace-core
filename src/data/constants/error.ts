export enum ERROR_NAME {
	ROUTE_NOT_FOUND = 'RouteNotFoundError',
	INVALID_CONTENT_TYPE = 'InvalidContentTypeError',
	INTERNAL_SERVER_ERROR = 'InternalServerError',
	METHOD_NOT_ALLOWED = 'RequestMethodNotAllowedError',
	INVALID_ARGUMENT_ERROR = 'InvalidArgumentError',
	INVALID_DATE_RANGE_ARGUMENT_ERROR = 'InvalidDateRangeArgumentError',
	RESOURCE_NOT_FOUND_ERROR = 'ResourceNotFoundError',
}

export enum ERROR_MESSAGE {
	INVALID_ID = 'Invalid id received from client',
	INTERNAL_SERVVER_ERROR = 'Internal server error',
	INVALID_DATE = 'Invalid date received from client',
	INVALID_ARGUMENT = 'Invalid argument received from client',
	RESOURCE_NOT_FOUND = 'The requested resource was not found',
	INVALID_DATE_RANGE_ARGUMENT = 'Invalid date range received from client',
}
