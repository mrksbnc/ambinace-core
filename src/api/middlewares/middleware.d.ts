import type { TRequest, TResponse } from '..';
import type { Application, NextFunction, Request, Response } from 'express';
/**
 * Interface definition for base middleware class.
 */
export declare interface TMiddleware {
	/**
	 * Registers middleware on the argument express application.
	 */
	register(app: Application): void;
	/**
	 * Error handler middleware. This middleware should be registered last.
	 * If the error is an instance of BaseError, response will depend on HttpError's status code
	 * and message. Otherwise, response will be 500 Internal Server Error.
	 */
	readonly errorHandler(error: unknown, request: Request, response: Response, next: NextFunction): void;
	/**
	 * Authentication middleware. This middleware should be registered after before the route execution
	 * that requires authentication begins.
	 */
	readonly authHandler(request: TRequest, response: TResponse, next: NextFunction): void;
	/**
	 * Route not found handler middleware. This middleware should be registered before the error handler but after
	 * all routes.
	 */
	readonly routeNotFoundHandler(request: Request, response: Response, next: NextFunction): void;
}
