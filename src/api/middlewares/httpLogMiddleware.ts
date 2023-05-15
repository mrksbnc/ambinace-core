import Log from '@/utils/logger';
import morgan from 'morgan';

export const httpLogMiddleware = morgan(':method :url :status :response-time ms', {
	stream: {
		write: (message) => Log.sharedInstance.baseLogger.http(message.trim()),
	},
});
