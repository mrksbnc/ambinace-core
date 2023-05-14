import type { Request, Response } from 'express';
import type { TSession } from '@/service/authService';
/**
 * Type definition for supported HTTP request methods.
 */
export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface TRequest<P = object, B = object, Q = object> extends Request {
	params: P;
	body: B;
	query: Q;
}

export type TLocals = {
	session: TSession;
};

export interface TResponse<B = object, L = TLocals> extends Response {
	body: B;
	locals: L;
}
