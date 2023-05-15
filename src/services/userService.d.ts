import type { Prisma } from '@prisma/client';
import type { TAuthService } from './authService';
import type { TPartialUser, TUserRepository } from '@/database/repositories/userRepository.d';

export type TGetUserByIdServiceArgs = {
	id: string;
};

export type TGetManyUsersByIdsServiceArgs = {
	ids: string[];
};

export type TUpdateUserServiceArgs = {
	id: string;
	user: Prisma.UserUpdateInput;
};

export type TDeleteUserServiceArgs = {
	id: string;
};

export type TRestoreUserServiceArgs = {
	id: string;
};

export type TUserServiceConstructorArgs = {
	userRepository: TUserRepository;
	authService: TAuthService;
};
/**
 * Interface definition for the user service.
 */
export interface TUserService {
	/**
	 * Returns a single user or null if user not exists in the database
	 * using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	getById({ id }: TGetUserByIdServiceArgs): Promise<TPartialUser | null>;
	/**
	 * Returns a single user or null if user not exists in the database
	 * using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	getManyByIds({ ids }: TGetManyUsersByIdsServiceArgs): Promise<TPartialUser[]>;
	/**
	 * Updates an existing user in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 * @throws InvalidPayloadError if the user payload is not valid.
	 */
	update({ id, user }: TUpdateUserServiceArgs): Promise<TPartialUser>;
	/**
	 * Soft deletes an existing user in the database using the injected repository.
	 * This is the preferred way to delete a user.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	softDelete({ id }: TDeleteUserServiceArgs): Promise<void>;
	/**
	 * Restores a soft deleted user in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	restore({ id }: TRestoreUserServiceArgs): Promise<void>;
	/**
	 * Permanently deletes an existing user in the database using the injected repository.
	 *
	 * This is not the preferred way to delete a user.
	 * Use softDelete instead.
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	hardDelete({ id }: TDeleteUserServiceArgs): Promise<void>;
}
