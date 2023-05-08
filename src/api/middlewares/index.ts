import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { httpLogMiddleware } from './httpLog';
import express, { type Application } from 'express';
import { responseHeaderMiddleware } from './responseHeader';
import { requestMethodValidatorMiddleware } from './requestMethosValidator';

export const registerApiMiddlewares = (app: Application): void => {
	app.all('*', responseHeaderMiddleware);
	app.use(helmet({ hidePoweredBy: true }));
	app.use(cors());
	app.use(hpp());

	app.use(requestMethodValidatorMiddleware);
	app.use(httpLogMiddleware);

	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json({ type: 'application/json' }));
};
