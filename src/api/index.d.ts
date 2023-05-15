import type { TSession } from '@/services/authService';

/**
 * Type definition for supported HTTP request methods.
 */
export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface TLocals extends Locals {
	session: TSession;
}
