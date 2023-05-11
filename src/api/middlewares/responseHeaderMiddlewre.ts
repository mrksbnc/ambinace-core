import type { NextFunction, Request, Response } from 'express';

export default function responseHeaderMiddlewre(request: Request, response: Response, next: NextFunction): void {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'application/json');
	response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	next();
}
