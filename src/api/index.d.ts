import type { TSession } from '@/services/authService';
import type { Locals, Request, Response } from 'express';
import type { Query, ParamsDictionary } from 'express-serve-static-core';
/**
 * Type definition for supported HTTP request methods.
 */
export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface TRequest<P extends ParamsDictionary = object, Q extends Query = object, B = object> extends Request {
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
