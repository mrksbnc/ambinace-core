import type { TUserRepository } from './userRepository.d';
import type { TEntryRepository } from './entryRepository.d';
import type { TActivityRepository } from './activityRepository.d';

export interface TRepository {
	user: TUserRepository;
	entry: TEntryRepository;
	activity: TActivityRepository;
}
