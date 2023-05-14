import type { Prisma, User } from '@prisma/client';
import type { TUserRepository, TUserRepositoryConstructorArgs } from './userRepository.d';

export default class UserRepository implements TUserRepository {
	private readonly _delegate: Prisma.UserDelegate<false>;

	constructor({ delegate }: TUserRepositoryConstructorArgs) {
		this._delegate = delegate;
	}

	async findById({ id }: { id: number }): Promise<User | null> {
		const queryResult = await this._delegate.findUnique({
			where: { id },
		});
		return queryResult;
	}

	async findManyByIds({ ids }: { ids: number[] }): Promise<User[]> {
		const queryResult = await this._delegate.findMany({
			where: { id: { in: ids } },
		});
		return queryResult;
	}

	async create({ user }: { user: Prisma.UserCreateInput }): Promise<User> {
		const queryResult = await this._delegate.create({ data: user });
		return queryResult;
	}

	async update({ id, user }: { id: number; user: Prisma.UserUpdateInput }): Promise<User> {
		const queryResult = await this._delegate.update({
			where: { id },
			data: user,
		});
		return queryResult;
	}

	async softDelete({ id }: { id: number }): Promise<void> {
		await this._delegate.update({
			where: { id },
			data: { isActive: false },
		});
	}

	async restore({ id }: { id: number }): Promise<void> {
		await this._delegate.update({
			where: { id },
			data: { isActive: true },
		});
	}

	async hardDelete({ id }: { id: number }): Promise<void> {
		await this._delegate.delete({ where: { id } });
	}
}
