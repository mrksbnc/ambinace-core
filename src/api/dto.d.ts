import type { Prisma } from '@prisma/client';
import type { TPartialUser } from '@/database/repositories/userRepository';
/**
 * Request DTO definition for the register endpoint.
 */
export type TRegisterRequestDto = {
	user: Prisma.UserCreateInput;
};
/**
 * Response DTO definition for the register endpoint.
 */
export type TRegisterResponseDto = {
	user: TPartialUser;
	token: string;
};
/**
 * Request DTO definition for the login endpoint.
 */
export type TLoginRequestDto = {
	email: string;
	password: string;
};
/**
 * Response DTO definition for the login endpoint.
 */
export type TLoginResponseDto = {
	user: TPartialUser;
	token: string;
};
/**
 * Request DTO definition for the get user endpoint.
 */
export type TGetUserRequestDto = {
	id: string;
};
/**
 * Response DTO definition for the get user endpoint.
 */
export type TGetUserResponseDto = {
	user: TPartialUser;
};
/**
 * Request DTO definition for the get many by ids endpoint.
 */
export type TGetManyByIdsRequestDto = {
	ids: string[];
};
/**
 * Response DTO definition for the get many users endpoint.
 */
export type TGetManyUserByIdsResponseDto = {
	users: TPartialUser[];
};
/**
 * Request DTO definition for the update user endpoint.
 */
export type TUpdateUserRequestDto = {
	id: string;
	user: Prisma.UserUpdateInput;
};
/**
 * Response DTO definition for the update user endpoint.
 */
export type TUpdateUserResponseDto = {
	user: TPartialUser;
};
/**
 * Request DTO definition for the delete user endpoint.
 */
export type TDeleteUserRequestDto = {
	id: string;
};
/**
 * Request DTO definition for the restore user endpoint.
 */
export type TRestoreUserRequestDto = {
	id: string;
};
