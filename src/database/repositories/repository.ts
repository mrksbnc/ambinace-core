import Database from '../database';
import UserRepository from './userRepository';
import EntryRepository from './entryRepository';
import type { TRepository } from './repository.d';
import type { PrismaClient } from '@prisma/client';
import ActivityRepository from './activityRepository';

let sharedInstance: Repository | null = null;

export default class Repository implements TRepository {
	static get sharedInstance(): Repository {
		if (sharedInstance === null) sharedInstance = new Repository();
		return sharedInstance;
	}

	private readonly _client: PrismaClient = Database.sharedInstance.getDefaultClient();

	readonly user: UserRepository = new UserRepository({ delegate: this._client.user });
	readonly entry: EntryRepository = new EntryRepository({ delegate: this._client.entry });
	readonly activity: ActivityRepository = new ActivityRepository({ delegate: this._client.activity });
}
