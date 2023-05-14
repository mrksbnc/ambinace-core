import { Router } from 'express';
import type { TRoute } from './router.d';
import { controllers } from '../controllers';
import { body, param } from 'express-validator';
import type EntryController from '../controllers/entryController';
import { VALIDATION_MESSAGE } from '@/data/constants/validation';

let sharedInstance: EntryRoute | null = null;

export default class EntryRoute implements TRoute {
	private readonly _controller: EntryController;

	public static get sharedInstance(): EntryRoute {
		if (sharedInstance === null) {
			sharedInstance = new EntryRoute(controllers.entry);
		}
		return sharedInstance;
	}

	public readonly path: string;
	public readonly router: Router;

	constructor(constoller: EntryController) {
		this.router = Router();
		this._controller = constoller;
		this.path = constoller.path ?? '/entry';
		this.registerRoutes();
	}

	private registerRoutes(): void {
		this.router.get(
			this.path + '/get/:userId',
			param('userId').isNumeric().withMessage(VALIDATION_MESSAGE.INVALID_USER_ID),
			controllers.entry.getEntries,
		);
		// this.router.get(
		// 	this.path + '/get_by_date/:userId/:date',
		// 	param('userId').isUUID(4).withMessage(VALIDATION_MESSAGE.INVALID_USER_ID),
		// 	param('date').isDate().withMessage(VALIDATION_MESSAGE.INVALID_DATE),
		// 	this._controller.getEntriesByDate,
		// );
		// this.router.get(
		// 	this.path + '/:id',
		// 	param('id').isNumeric().withMessage(VALIDATION_MESSAGE.INVALID_ENTRY_ID),
		// 	this._controller.getEntryById,
		// );
		// this.router.post(
		// 	this.path + '/create',
		// 	body('entry').exists().withMessage(VALIDATION_MESSAGE.INVALID_ENTRY),
		// 	this._controller.createEntry,
		// );
		// this.router.put(
		// 	this.path + '/update',
		// 	body('id').isNumeric().withMessage(VALIDATION_MESSAGE.INVALID_ENTRY_ID),
		// 	body('entry').exists().withMessage(VALIDATION_MESSAGE.INVALID_ENTRY),
		// 	this._controller.updateEntry,
		// );
		// this.router.delete(
		// 	this.path + '/soft/:id',
		// 	param('id').isNumeric().withMessage(VALIDATION_MESSAGE.INVALID_ENTRY_ID),
		// 	this._controller.softDeleteEntry,
		// );
		// this.router.delete(
		// 	this.path + '/hard/:id',
		// 	param('id').isNumeric().withMessage(VALIDATION_MESSAGE.INVALID_ENTRY_ID),
		// 	this._controller.hardDeleteEntry,
		// );
	}
}
