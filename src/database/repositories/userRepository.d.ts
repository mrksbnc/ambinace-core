import type { Prisma, User } from '@prisma/client';

export type TPartialUser = Omit<User, 'password'>;

export type TFindUserByIdArgs = {
	id: number;
};

export type TFindUserByEmailArgs = {
	email: string;
};

export type TFindUsersByIdsArgs = {
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
	findById({ id }: TFindUserByIdArgs): Promise<TPartialUser | null>;
	/**
	 * Returns a single user by email or null if user not found
	 */
	findByEmail({ email }: TFindUserByEmailArgs): Promise<User | null>;
	/**
	 * Returns a multiple user by the user ids or empty array if no users
	 */
	findManyByIds({ ids }: TFindUsersByIdsArgs): Promise<TPartialUser[]>;
	/**
	 * Creates a new user
	 */
	create({ user }: TCreateUserArgs): Promise<TPartialUser>;
	/**
	 * Updates an existing user
	 */
	update({ id, user }: TUpdateUserArgs): Promise<TPartialUser>;
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
