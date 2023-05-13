import type { Request } from 'express';

export interface TRequest<B, P, Q> extends Request {
	body: B;
	params: P;
	query: Q;
}
