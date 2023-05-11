import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express, { type Application } from 'express';
import responseHeaderMiddlewre from './responseHeaderMiddlewre';
import requestMethodValidatorMiddleware from './requestMethodValidatorMiddleware';
import httpLoggerMiddleware from './httpLoggerMiddleware';

export const registerApiMiddlewares = (app: Application): void => {
	app.all('*', responseHeaderMiddlewre);
	app.use(helmet({ hidePoweredBy: true }));
	app.use(cors());
	app.use(hpp());

	app.use(requestMethodValidatorMiddleware);
	app.use(httpLoggerMiddleware);

	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json({ type: 'application/json' }));
};
