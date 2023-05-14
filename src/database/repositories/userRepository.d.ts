import type { Prisma, User } from '@prisma/client';

export type TGetUserByIdArgs = {
	id: number;
};

export type TGetUsersByIds = {
	ids: number[];
};

export type TCreateUserArgs = {
	user: Prisma.UserCreateInput;
};

export type TUserRepositoryConstructorArgs = {
	delegate: Prisma.UserDelegate<false>;
};

export type TUpdateUserArgs = {
	id: number;
	user: Prisma.UserUpdateInput;
};

export type TDeleteUserArgs = {
	id: number;
};

export type TRestoreUserArgs = {
	id: number;
};
/**
 * Interface definition for UserRepository
 */
export interface TUserRepository {
	/**
	 * Returns a single user by id or null if user not found
	 */
	findById({ id }: TGetUserByIdArgs): Promise<User | null>;
	/**
	 * Returns a multiple user by the user ids or empty array if no users
	 */
	findManyByIds({ ids }: TGetUsersByIds): Promise<User[]>;
	/**
	 * Creates a new user
	 */
	create({ user }: TCreateUserArgs): Promise<User>;
	/**
	 * Updates an existing user
	 */
	update({ id, user }: TUpdateUserArgs): Promise<User>;
	/**
	 * Soft deletes an existing user
	 */
	softDelete({ id }: TDeleteUserArgs): Promise<void>;
	/**
	 * Restores a soft deleted user
	 */
	restore({ id }: TRestoreUserArgs): Promise<void>;
	/**
	 * Permanent deletes an existing user
	 */
	hardDelete({ id }: TDeleteUserArgs): Promise<void>;
}
