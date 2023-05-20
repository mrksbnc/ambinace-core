import type {
	TDeleteMoodArgs,
	TCreateMoodArgs,
	TUpdateMoodArgs,
	TFindMoodByIdArgs,
	TFindMoodsByUserIdArgs,
	TFindDefaultsWithUserArgs,
} from './moodRepository.d';
import Database from '../database';
import type { Mood, Prisma } from '@prisma/client';
import type { TMoodRepository, TMoodRepositoryConstructorArgs } from './moodRepository.d';

let sharedInstance: MoodRepository | null = null;

export default class MoodRepository implements TMoodRepository {
	private readonly delegate: Prisma.MoodDelegate<false>;

	public static get sharedInstance(): MoodRepository {
		if (sharedInstance === null) {
			sharedInstance = new MoodRepository({
				delegate: Database.sharedInstance.getDefaultClient().mood,
			});
		}
		return sharedInstance;
	}

	constructor({ delegate }: TMoodRepositoryConstructorArgs) {
		this.delegate = delegate;
	}

	public async findById({ id }: TFindMoodByIdArgs): Promise<Mood | null> {
		const queryResult = await this.delegate.findUnique({ where: { id } });
		return queryResult;
	}

	public async findByUserId({ userId }: TFindMoodsByUserIdArgs): Promise<Mood[]> {
		const queryResult = await this.delegate.findMany({ where: { userId } });
		return queryResult;
	}

	public async findDefaultsWithUser({ userId }: TFindDefaultsWithUserArgs): Promise<Mood[]> {
		const queryResult = await this.delegate.findMany({
			where: { OR: [{ userId }, { userId: null }] },
		});
		return queryResult;
	}

	public async create({ mood }: TCreateMoodArgs): Promise<Mood> {
		const queryResult = await this.delegate.create({ data: mood });
		return queryResult;
	}

	public async update({ id, mood }: TUpdateMoodArgs): Promise<Mood> {
		const queryResult = await this.delegate.update({ where: { id }, data: mood });
		return queryResult;
	}

	public async softDelete({ id }: TDeleteMoodArgs): Promise<void> {
		await this.delegate.update({ where: { id }, data: { isActive: false } });
	}

	public async restore({ id }: TDeleteMoodArgs): Promise<void> {
		await this.delegate.update({ where: { id }, data: { isActive: true } });
	}

	public async hardDelete({ id }: TDeleteMoodArgs): Promise<void> {
		await this.delegate.delete({ where: { id } });
	}
}
