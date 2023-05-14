import type {
	TGetEntriesArgs,
	TUpdateEntryArgs,
	TCreateEntryArgs,
	TGetEntryByIdArgs,
	TGetEntriesByDateArgs,
} from '@/types/args';
import type { TRequest } from './index.d';
import type { Entry } from '@prisma/client';
import { validationResult } from 'express-validator';
import BaseResponse from '@/data/models/baseResponse';
import type EntryService from '@/service/entryService';
import type { TEntryController } from './entryController.d';
import InvalidArgumentError from '@/error/invalidArgumentError';
import { HTTP_STATUS_CODE } from '@/data/constants/httpStatusCode';
import { type NextFunction, type Request, type Response } from 'express';
import { services } from '@/service';

export default class EntryController implements TEntryController {
	readonly service: EntryService;

	public readonly path = '/entry';

	constructor(service: EntryService) {
		this.service = service;
		console.log('EntryController constructor');
		console.log('this.service', this.service);
	}

	public async getEntries(
		request: TRequest<object, TGetEntriesArgs, object>,
		response: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const errors = validationResult(request);
			if (!errors.isEmpty()) next(new InvalidArgumentError());

			console.log('request.params', request.params);

			const userId = request.params.userId;
			const requestArgs: TGetEntriesArgs = { userId };

			const data: Entry[] = (await services.entry.getEntries(requestArgs)) ?? [];

			response.status(HTTP_STATUS_CODE.OK).json(new BaseResponse<Entry[]>({ data }));
		} catch (error) {
			next(error);
		}
	}

	// public async getEntriesByDate(
	// 	request: TRequest<object, TGetEntriesByDateArgs, object>,
	// 	response: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	try {
	// 		const errors = validationResult(request);
	// 		if (!errors.isEmpty()) next(new InvalidArgumentError());

	// 		const userId: number = request.params.userId;
	// 		const dateString: Date = request.params.date;
	// 		const requestArgs: TGetEntriesByDateArgs = { date: new Date(dateString), userId };

	// 		const data = await this.service.getEntriesByDate(requestArgs);

	// 		response.status(HTTP_STATUS_CODE.OK).json(new BaseResponse<Entry[]>({ data }));
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	// public async getEntryById(
	// 	request: TRequest<object, TGetEntryByIdArgs, object>,
	// 	response: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	try {
	// 		const errors = validationResult(request);
	// 		if (!errors.isEmpty()) next(new InvalidArgumentError());

	// 		const id: number = request.params.id;
	// 		const data: Entry | null = await this.service.getEntryById({ id });

	// 		response.status(HTTP_STATUS_CODE.OK).json(
	// 			new BaseResponse({
	// 				data,
	// 				message: data === null ? 'Entry not found' : 'Success',
	// 			}),
	// 		);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	// public async createEntry(
	// 	request: TRequest<TCreateEntryArgs, object, object>,
	// 	response: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	try {
	// 		const errors = validationResult(request);
	// 		if (!errors.isEmpty()) next(new InvalidArgumentError());

	// 		const requestArgs: TCreateEntryArgs = { entry: request.body.entry };

	// 		const data: Entry = await this.service.createEntry(requestArgs);

	// 		response.status(HTTP_STATUS_CODE.CREATED).json(new BaseResponse({ data }));
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	// public async updateEntry(request: Request, response: Response, next: NextFunction): Promise<void> {
	// 	try {
	// 		const errors = validationResult(request);
	// 		if (!errors.isEmpty()) next(new InvalidArgumentError());

	// 		const id = Number(request.body.id);
	// 		const entry: Entry = request.body.entry;
	// 		const requestArgs: TUpdateEntryArgs = { id, entry };

	// 		const data = await this.service.updateEntry(requestArgs);

	// 		response.status(HTTP_STATUS_CODE.OK).json(new BaseResponse({ data }));
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	// public async softDeleteEntry(request: Request, response: Response, next: NextFunction): Promise<void> {
	// 	try {
	// 		const errors = validationResult(request);
	// 		if (!errors.isEmpty()) next(new InvalidArgumentError());

	// 		const id = Number(request.params.id);
	// 		await this.service.softDeleteEntry({ id });

	// 		response.status(HTTP_STATUS_CODE.OK).json(new BaseResponse({}));
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	// public async hardDeleteEntry(request: Request, response: Response, next: NextFunction): Promise<void> {
	// 	try {
	// 		const errors = validationResult(request);
	// 		if (!errors.isEmpty()) next(new InvalidArgumentError());

	// 		const id = Number(request.params.id);
	// 		await this.service.hardDeleteEntry({ id });

	// 		response.status(HTTP_STATUS_CODE.OK).json(new BaseResponse({}));
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
}
