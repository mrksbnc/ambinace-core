import { services } from '@/service';
import EntryController from './entryController';

export const controllers = {
	entry: new EntryController(services.entry),
};
