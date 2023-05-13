import AuthService from './authService';
import EntryService from './entryService';
import AmbianceConfig from '@/config/appConfig';
import { repositories } from '@/database/repositories';
import { AUTH_CONFIG_KEY } from '@/data/constants/ambianceConfig';

export const services = {
	auth: new AuthService(AmbianceConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_SECRET]),
	entry: new EntryService(repositories.entry),
};
