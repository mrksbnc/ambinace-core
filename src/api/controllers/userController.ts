import type {
	TGetUserResponseDto,
	TUpdateUserRequestDto,
	TUpdateUserResponseDto,
	TGetManyByIdsRequestDto,
	TGetManyUserByIdsResponseDto,
} from '../dto';
import type { TUserController } from './userController.d';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse.d';
import type { TDeleteUserRequestParams, TGetUserRequestParams } from '../request';

export default class UserController implements TUserController {
	public get = async (
		request: Request<TGetUserRequestParams, never, never>,
		response: Response<TBaseResponse<TGetUserResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			//
		} catch (error) {
			next(error);
		}
	};

	public getMany = async (
		request: Request<never, never, TGetManyByIdsRequestDto>,
		response: Response<TBaseResponse<TGetManyUserByIdsResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			//
		} catch (error) {
			next(error);
		}
	};

	public update = async (
		request: Request<never, never, TUpdateUserRequestDto>,
		response: Response<TBaseResponse<TUpdateUserResponseDto>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			//
		} catch (error) {
			next(error);
		}
	};

	public softDelete = async (
		request: Request<TDeleteUserRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			//
		} catch (error) {
			next(error);
		}
	};

	public hardDelete = async (
		request: Request<TDeleteUserRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			//
		} catch (error) {
			next(error);
		}
	};

	public restore = async (
		request: Request<TDeleteUserRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void> => {
		try {
			//
		} catch (error) {
			next(error);
		}
	};
}
