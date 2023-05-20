import type {
	TDeleteRequestParams,
	TGetByIdRequestParams,
	TRestoreRequestParams,
	TGetByUserIdRequestParams,
} from '../request';
import type {
	TCreateEntryRequestDto,
	TCreateEntryResponseDto,
	TUpdateEntryRequestDto,
	TUpdateEntryResponseDto,
	TGetEntryByIdResponseDto,
	TGetEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndDateRequestDto,
	TGetEntriesByUserIdAndMoodRequestDto,
	TGetActiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndMoodResponseDto,
	TGetEntriesByUserIdAndDateResponseDto,
	TGetInactiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndDateRangeRequestDto,
	TGetEntriesByUserIdAndDateRangeResponseDto,
} from '../dto';
import type { NextFunction, Request, Response } from 'express';
import type { TBaseResponse } from '@/data/models/baseResponse';

export declare interface TEntryControllerConstructorArgs {
	service: TEntryService;
}
/**
 * Interface definition for the entry controller.
 */
export declare interface TEntryController {
	/**
	 * Returns a base response with the entry that matches the given id
	 * or calls the next middleware with an error.
	 */
	get(
		request: Request<TGetByIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetEntryByIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the entries that match the given user id
	 * or calls the next middleware with an error.
	 */
	getByUserId(
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetEntriesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the entries that match the given user id and date
	 * or calls the next middleware with an error.
	 */
	getByUserIdAndDate(
		request: Request<never, never, TGetEntriesByUserIdAndDateRequestDto>,
		response: Response<TBaseResponse<TGetEntriesByUserIdAndDateResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Return a base response with the entries that matches the given userId
	 * and date range.
	 * Start date is inclusive and end date is exclusive.
	 *
	 * Calls the next middleware if an error occurs.
	 */
	getByUserIdAndDateRange(
		request: Request<never, never, TGetEntriesByUserIdAndDateRangeRequestDto>,
		response: Response<TBaseResponse<TGetEntriesByUserIdAndDateRangeResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the entries that matches the given userId
	 * and mood.
	 *
	 * Calls the next middleware if an error occurs.
	 */
	getByUserIdAndMood(
		request: Request<never, never, TGetEntriesByUserIdAndMoodRequestDto>,
		response: Response<TBaseResponse<TGetEntriesByUserIdAndMoodResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the active entries that matches the given userId
	 *
	 * Calls the next middleware if an error occurs.
	 */
	getActiveByUserId(
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetActiveEntriesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the inactive entries that matches the given userId
	 *
	 * Calls the next middleware if an error occurs.
	 */
	getInactiveByUserId(
		request: Request<TGetByUserIdRequestParams, never, never>,
		response: Response<TBaseResponse<TGetInactiveEntriesByUserIdResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the created entry
	 *
	 * Calls the next middleware if an error occurs.
	 */
	create(
		request: Request<never, never, TCreateEntryRequestDto>,
		response: Response<TBaseResponse<TCreateEntryResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Returns a base response with the updated entry
	 */
	update(
		request: Request<never, never, TUpdateEntryRequestDto>,
		response: Response<TBaseResponse<TUpdateEntryResponseDto>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Soft deletes an entry
	 * This is the preferred way of deleting an entry.
	 *
	 * Calls the next middleware if an error occurs.
	 */
	softDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Restores a soft deleted entry
	 *
	 * Calls the next middleware if an error occurs.
	 */
	restore(
		request: Request<TRestoreRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
	/**
	 * Hard deletes an entry
	 * This should only be used for testing purposes.
	 * @see softDelete
	 *
	 * Calls the next middleware if an error occurs.
	 */
	hardDelete(
		request: Request<TDeleteRequestParams, never, never>,
		response: Response<TBaseResponse<never>>,
		next: NextFunction,
	): Promise<void>;
}
