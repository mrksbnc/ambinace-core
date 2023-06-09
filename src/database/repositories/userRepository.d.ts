import type { Prisma, User } from '@prisma/client';

export declare type TPartialUser = Omit<User, 'password'>;

export declare type TFindUserByIdArgs = {
	id: number;
};

export declare type TFindUserByEmailArgs = {
	email: string;
};

export declare type TFindUsersByIdsArgs = {
	ids: number[];
};

export declare type TCreateUserArgs = {
	user: Prisma.UserCreateInput;
};

export declare type TUserRepositoryConstructorArgs = {
	delegate: Prisma.UserDelegate<false>;
};

export declare type TUpdateUserArgs = {
	id: number;
	user: Prisma.UserUpdateInput;
};

export declare type TDeleteUserArgs = {
	id: number;
};

export declare type TRestoreUserArgs = {
	id: number;
};
/**
 * Interface definition for UserRepository
 */
export declare interface TUserRepository {
	/**
	 * Maps a user to a partial user
	 */
	mapUser(user: User): TPartialUser | null;
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
