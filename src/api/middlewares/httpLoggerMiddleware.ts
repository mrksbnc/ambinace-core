import Log from '@/utils/logger';
import type { Request, Response } from 'express';
import morgan, { type StreamOptions } from 'morgan';

const logStream: StreamOptions = {
	write: (message) => Log.sharedInstance.baseLogger.info(message.slice(0, message.length - 1)),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function httpLoggerMiddleware(request: Request, response: Response): void {
	morgan('[HTTP]:remote-addr :method :url HTTP/:http-version :status - :response-time ms', {
		stream: logStream,
	});
}
