import type {
	TPartialUser,
	TUserRepository,
	TCreateUserArgs,
	TUpdateUserArgs,
	TDeleteUserArgs,
	TRestoreUserArgs,
	TFindUserByIdArgs,
	TFindUsersByIdsArgs,
	TUserRepositoryConstructorArgs,
} from './userRepository.d';
import Database from '../database';
import type { Prisma, User } from '@prisma/client';

let sharedInstance: UserRepository | null = null;

export default class UserRepository implements TUserRepository {
	private readonly _delegate: Prisma.UserDelegate<false>;

	static get sharedInstance(): UserRepository {
		if (sharedInstance === null) {
			sharedInstance = new UserRepository({
				delegate: Database.sharedInstance.getDefaultClient().user,
			});
		}
		return sharedInstance;
	}

	constructor({ delegate }: TUserRepositoryConstructorArgs) {
		this._delegate = delegate;
	}

	private _mapUser(user: User): TPartialUser {
		const partialUser: TPartialUser = {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			isActive: user.isActive,
		};
		return partialUser;
	}

	async findById({ id }: TFindUserByIdArgs): Promise<TPartialUser | null> {
		const queryResult = await this._delegate.findUnique({
			where: { id },
		});
		return queryResult === null ? null : this._mapUser(queryResult);
	}

	async findByEmail({ email }: { email: string }): Promise<User | null> {
		const queryResult = await this._delegate.findUnique({
			where: { email },
		});
		return queryResult;
	}

	async findManyByIds({ ids }: TFindUsersByIdsArgs): Promise<TPartialUser[]> {
		const queryResult = await this._delegate.findMany({
			where: { id: { in: ids } },
		});

		return queryResult.map((user) => this._mapUser(user));
	}

	async create({ user }: TCreateUserArgs): Promise<TPartialUser> {
		const queryResult = await this._delegate.create({ data: user });
		return this._mapUser(queryResult);
	}

	async update({ id, user }: TUpdateUserArgs): Promise<TPartialUser> {
		const queryResult = await this._delegate.update({
			where: { id },
			data: user,
		});
		return this._mapUser(queryResult);
	}

	async softDelete({ id }: TDeleteUserArgs): Promise<void> {
		await this._delegate.update({
			where: { id },
			data: { isActive: false },
		});
	}

	async restore({ id }: TRestoreUserArgs): Promise<void> {
		await this._delegate.update({
			where: { id },
			data: { isActive: true },
		});
	}

	async hardDelete({ id }: TDeleteUserArgs): Promise<void> {
		await this._delegate.delete({ where: { id } });
	}
}
