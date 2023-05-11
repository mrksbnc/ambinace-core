import type { Application } from 'express';

export type TServer = {
	get: () => Application;
	init: () => Promise<void>;
};
