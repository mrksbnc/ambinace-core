import type { NextFunction } from 'express';
import type { TAuthService } from '../../services/authService.d';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import type { TLoginRequestDto, TLoginResponseDto, TRegisterRequestDto, TRegisterResponseDto } from '../dto.d';

export type TAuthControllerConstructorArgs = {
	authService: TAuthService;
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
		request: Request<never, never, TRegisterRequestDto>,
		response: Response<TBaseResponse<TRegisterResponseDto>, TLocals>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Logs in a user based on the request body data or calls the next middleware function
	 * if an error occurs.
	 */
	login(
		request: Request<never, never, TLoginRequestDto>,
		response: Response<TBaseResponse<TLoginResponseDto>>,
		next: NextFunction,
	): Promise<void>;
}
