import type { NextFunction, Request, Response } from 'express';

export const responseHeaderMiddleware = (request: Request, response: Response, next: NextFunction): void => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	next();
};
