import Database from '../database';
import EntryRepository from './entryRepository';
import ActivityRepository from './activityRepository';

export const repositories = {
	entry: new EntryRepository(Database.sharedInstance.getDefaultClient().entry),
	activity: new ActivityRepository(Database.sharedInstance.getDefaultClient().activity),
};
