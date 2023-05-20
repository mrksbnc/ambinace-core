import type {
	TCreateMoodRequestDto,
	TUpdateMoodRequestDto,
	TDeleteMoodRequestDto,
	TCreateMoodResponseDto,
	TGetMoodByIdRequestDto,
	TRestoreMoodRequestDto,
	TUpdateMoodResponseDto,
	TGetMoodByIdResponseDto,
	TGetMoodsByUserIdRequestDto,
	TGetMoodsByUserIdResponseDto,
	TGetDefaultsWithUserIdRequestDto,
} from '@/api/dto';
import type { TMoodRepository } from '@/database/repositories/moodRepository.d';

export declare type TMoodServiceConstructorArgs = {
	moodRepository: TMoodRepository;
};
/**
 * Interface definition for MoodServices
 */
export declare interface TMoodService {
	/**
	 * Uses the dependency injected repository to return a single mood by id or null if
	 * the mood not found
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	getById({ id }: TGetMoodByIdRequestDto): Promise<TGetMoodByIdResponseDto>;
	/**
	 * Uses the dependency injected repository to return multiple moods by userId or empty
	 * array if no moods were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getByUserId({ userId }: TGetMoodsByUserIdRequestDto): Promise<TGetMoodsByUserIdResponseDto>;
	/**
	 * Uses the dependency injected repository to return the default and user created moods
	 * or empty array if no moods were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getDefaultsWithUser({ userId }: TGetDefaultsWithUserIdRequestDto): Promise<TGetMoodsByUserIdResponseDto>;
	/**
	 * Uses the dependency injected repository to create a mood
	 *
	 * @throws InvalidArgumentError if the mood is not valid
	 */
	create({ mood }: TCreateMoodRequestDto): Promise<TCreateMoodResponseDto>;
	/**
	 * Uses the dependency injected repository to update a mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 * @throws InvalidPayloadError if the mood is not valid
	 */
	update({ id, mood }: TUpdateMoodRequestDto): Promise<TUpdateMoodResponseDto>;
	/**
	 * Uses the dependency injected repository to soft delete a mood
	 * This is the preferred method of deleting a mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	softDelete({ id }: TDeleteMoodRequestDto): Promise<void>;
	/**
	 * Uses the dependency injected repository to restore a soft deleted mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	restore({ id }: TRestoreMoodRequestDto): Promise<void>;
	/**
	 * Uses the dependency injected repository to permanently delete a mood
	 * This is not the preferred method of deleting a mood
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	hardDelete({ id }: TDeleteMoodRequestDto): Promise<void>;
}
