import type { TBaseError } from '@/error/base/baseError';
import type { TSession } from '@/services/authService';
import type { Locals, NextFunction, Request, Response } from 'express';
/**
 * Type definition for supported HTTP request methods.
 */
export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface TRequest<P = object, B = object, Q = object> extends Request {
	params: P;
	body: B;
	query: Q;
}

export interface TLocals extends Locals {
	session: TSession;
}

export interface TResponse<B = object, L = TLocals> extends Response {
	body: B;
	locals: L;
}

export interface TNextFunction extends NextFunction {
	(err?: TBaseError): void;
}
