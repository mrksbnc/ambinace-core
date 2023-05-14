import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express, { type Application } from 'express';
import responseHeaderMiddlewre from './responseHeader';
import requestMethodValidatorMiddleware from './requestValidator';

export const registerApiMiddlewares = (app: Application): Application => {
	app.all('*', responseHeaderMiddlewre);
	app.use(helmet({ hidePoweredBy: true }));
	app.use(cors());
	app.use(hpp());

	app.use(requestMethodValidatorMiddleware);

	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json({ type: 'application/json' }));

	return app;
};
