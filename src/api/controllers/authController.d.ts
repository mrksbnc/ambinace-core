import type { NextFunction } from 'express';
import type { TRequest, TResponse } from '../index.d';
import type { TUserService } from '@/services/userService';
import type { TAuthService } from '../../services/authService';
import type { TLoginRequestDto, TLoginResponseDto, TRegisterRequestDto, TRegisterResponseDto } from '../dto';

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
		request: TRequest<never, never, TRegisterRequestDto>,
		response: TResponse<TRegisterResponseDto>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Logs in a user based on the request body data or calls the next middleware function
	 * if an error occurs.
	 */
	login(
		request: TRequest<never, never, TLoginRequestDto>,
		response: TResponse<TLoginResponseDto>,
		next: NextFunction,
	): Promise<void>;
}
