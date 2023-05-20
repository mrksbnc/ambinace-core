import type {
	TCreateEntryRequestDto,
	TGetEntryByIdRequestDto,
	TGetEntryByIdResponseDto,
	TGetEntriesByUserIdRequestDto,
	TGetEntriesByUserIdResponseDto,
	TGetActiveEntriesByUserIdRequestDto,
	TGetActiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndDateRequestDto,
	TGetEntriesByUserIdAndMoodRequestDto,
	TGetInactiveEntriesByUserIdRequestDto,
	TGetEntriesByUserIdAndDateResponseDto,
	TGetEntriesByUserIdAndMoodResponseDto,
	TGetInactiveEntriesByUserIdResponseDto,
	TGetEntriesByUserIdAndDateRangeRequestDto,
	TGetEntriesByUserIdAndDateRangeResponseDto,
	TCreateEntryResponseDto,
	TUpdateEntryRequestDto,
	TUpdateEntryResponseDto,
	TDeleteEntryRequestDto,
	TRestoreEntryRequestDto,
} from '@/api/dto';
import type { TEntryRepository } from '@/database/repositories/entryRepository';

export declare type TEntryServiceConstructorArgs = {
	repository: TEntryRepository;
};
/**
 * Interface definition for EntryServices
 */
export declare interface TEntryService {
	/**
	 * Uses the dependency injected repository to return a single entry by id or null if
	 * the entry not found
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	getById({ id }: TGetEntryByIdRequestDto): Promise<TGetEntryByIdResponseDto>;
	/**
	 * Uses the dependency injected repository to return multiple entries by userId or empty
	 * array if no entries were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getByUserId({ userId }: TGetEntriesByUserIdRequestDto): Promise<TGetEntriesByUserIdResponseDto>;
	/**
	 * Uses the dependency injected repository to return a multiple entries by userId and date
	 * or empty array if no entries were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 * @throws InvalidArgumentError if the date is not a valid past or now date
	 */
	getByUserIdAndDate({
		userId,
		date,
	}: TGetEntriesByUserIdAndDateRequestDto): Promise<TGetEntriesByUserIdAndDateResponseDto>;
	/**
	 * Uses the dependency injected repository to return a multiple entries by userId and date
	 * range or empty array if no entries were found
	 *
	 * startDate is inclusive and endDate is exclusive. If no endDate is provided, it will
	 * default to the current date
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 * @throws InvalidArgumentError if the startDate or endDate are not valid past or now dates
	 * @throws InvalidDateRangeArgumentError if the startDate is greater than the endDate
	 */
	getByUserIdAndDateRange({
		userId,
		startDate,
		endDate,
	}: TGetEntriesByUserIdAndDateRangeRequestDto): Promise<TGetEntriesByUserIdAndDateRangeResponseDto>;
	/**
	 * Uses the dependency injected repository to return all the active entries by userId or
	 * empty array if no entries were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getActiveByUserId({ userId }: TGetActiveEntriesByUserIdRequestDto): Promise<TGetActiveEntriesByUserIdResponseDto>;
	/**
	 * Uses the dependency injected repository to return all the inactive entries by userId or
	 * empty array if no entries were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getInactiveByUserId({
		userId,
	}: TGetInactiveEntriesByUserIdRequestDto): Promise<TGetInactiveEntriesByUserIdResponseDto>;
	/**
	 * Uses the dependency injected repository to return a multiple entries by userId and mood
	 * or empty array if no entries were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getByUserIdAndMood({
		userId,
		moodId,
	}: TGetEntriesByUserIdAndMoodRequestDto): Promise<TGetEntriesByUserIdAndMoodResponseDto>;
	/**
	 * Uses the dependency injected repository to create a new entry and returns it
	 *
	 * @throws InvalidPayloadError if the entry payload is invalid
	 */
	create({ entry }: TCreateEntryRequestDto): Promise<TCreateEntryResponseDto>;
	/**
	 * Uses the dependency injected repository to update an existing entry and returns it
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 * @throws InvalidPayloadError if the entry payload is invalid
	 */
	update({ id, entry }: TUpdateEntryRequestDto): Promise<TUpdateEntryResponseDto>;
	/**
	 * Uses the dependency injected repository to soft delete an entry
	 * This is the preferred way to delete an entry
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	softDelete({ id }: TDeleteEntryRequestDto): Promise<void>;
	/**
	 * Uses the dependency injected repository to restore a soft deleted entry
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	restore({ id }: TRestoreEntryRequestDto): Promise<Entry>;
	/**
	 * Uses the dependency injected repository to permanently delete an entry
	 * This is not the preferred way to delete an entry
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	hardDelete({ id }: TDeleteEntryRequestDto): Promise<void>;
}
