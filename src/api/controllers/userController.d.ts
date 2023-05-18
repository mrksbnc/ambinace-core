import type {
	TGetUserResponseDto,
	TUpdateUserRequestDto,
	TUpdateUserResponseDto,
	TGetManyByIdsRequestDto,
	TGetManyUserByIdsResponseDto,
} from '../dto';
import type { TUserService } from '@/services/userService.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import type { TDeleteRequestParams, TGetByIdRequestParams, TRestoreRequestParams } from '../request.d';

export declare type TUserControllerConstructorArgs = {
	userService: TUserService;
};
/**
 * Interface definition for the auth controller.
 */
export declare interface TUserController {
	/**
	 * Returns a user by id or calls the next middleware function
	 * if an error occurs.
	 */
	get(
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetUserResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns many users by ids or calls the next middleware function
	 * if an error occurs.
	 */
	getMany(
		request: Request<never, never, TGetManyByIdsRequestDto>,
		response: Response<TBaseResponse<TGetManyUserByIdsResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Updates a user by id or calls the next middleware function
	 * if an error occurs.
	 */
	update(
		request: Request<never, never, TUpdateUserRequestDto>,
		response: Response<TBaseResponse<TUpdateUserResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Soft deletes a user by id or calls the next middleware function
	 * if an error occurs.
	 */
	softDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Restores a soft deleted user by id or calls the next middleware function
	 */
	restore(
		request: Request<TRestoreRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Hard deletes a user by id or calls the next middleware function
	 */
	hardDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
}
