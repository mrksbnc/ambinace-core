import type { NextFunction } from 'express';
import type { Prisma } from '@prisma/client';
import type { TRequest, TResponse } from '../index.d';
import type { TUserService } from '@/services/userService.d';
import type { TAuthService } from '../../services/authService.d';
import type { TPartialUser } from '@/database/repositories/userRepository.d';

export type TRegisterRequestBody = {
	user: Prisma.UserCreateInput;
};

export type TRegisterResponseBody = {
	token: string;
	user: TPartialUser;
};

export type TLoginRequestBody = {
	email: string;
	password: string;
};

export type TLoginResponseBody = {
	token: string;
	user: TPartialUser;
};

export type TAuthControllerConstructorArgs = {
	authService: TAuthService;
	userService: TUserService;
};
/**
 * Interface definition for the auth controller.
 */
export interface TAuthController {
	/**
	 * Registers a new user based on the request body data or calls the next middleware function
	 * if an error occurs.
	 */
	register(
		request: TRequest<never, never, TRegisterRequestBody>,
		response: TResponse<TRegisterResponseBody>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Logs in a user based on the request body data or calls the next middleware function
	 * if an error occurs.
	 */
	login(
		request: TRequest<never, never, TLoginRequestBody>,
		response: TResponse<TLoginResponseBody>,
		next: NextFunction,
	): Promise<void>;
}
