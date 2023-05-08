import { logger } from '@/utils/logger';
import morgan, { type StreamOptions } from 'morgan';

const logStream: StreamOptions = { write: (message) => logger.info(message.slice(0, message.length - 1)) };

export const httpLogMiddleware = morgan(
	'[HTTP]:remote-addr :method :url HTTP/:http-version :status - :response-time ms',
	{
		stream: logStream,
	},
);
