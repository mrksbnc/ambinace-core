import EntryService from '@/service/entryService';
import BaseResponse from '@/data/models/baseResponse';
import type { TEntryController } from './entryController.d';
import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';

let sharedInstance: EntryController | null = null;

export default class EntryController implements TEntryController {
	private readonly service: EntryService;

	static get SharedInstance(): EntryController {
		if (sharedInstance === null) {
			sharedInstance = new EntryController(EntryService.sharedInstance);
		}
		return sharedInstance;
	}

	constructor(service: EntryService) {
		this.service = service;
	}

	public async getEntries(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const entries = await this.service.getEntries();

			const dto = {
				entries: entries,
			};

			const responseData = new BaseResponse({
				data: dto,
			});

			response.status(HTTP_STATUS_CODE.OK).json(responseData);
		} catch (error) {
			next(error);
		}
	}
}
