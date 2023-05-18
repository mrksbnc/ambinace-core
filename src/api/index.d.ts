import type { TSession } from '@/services/authService';

/**
 * Type definition for supported HTTP request methods.
 */
export declare type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export declare interface TLocals extends Locals {
	session: TSession;
}
