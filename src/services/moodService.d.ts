import type { TMoodRepository } from '@/database/repositories/moodRepository.d';

export type TGetMoodByIdServiceArgs = {
	id: string;
};

export type TGetMoodsByUserIdServiceArgs = {
	userId: string;
};

export type TGetDefaultsWithUserServiceArgs = {
	userId: string;
};

export type TCreateMoodServiceArgs = {
	mood: Prisma.MoodCreateInput;
};

export type TUpdateMoodServiceArgs = {
	id: string;
	mood: Prisma.MoodUpdateInput;
};

export type TDeleteMoodServiceArgs = {
	id: string;
};

export type TRestoreMoodServiceArgs = {
	id: string;
};

export type TMoodServiceConstructorArgs = {
	moodRepository: TMoodRepository;
};
/**
 * Interface definition for MoodServices
 */
export interface TMoodService {
	/**
	 * Uses the dependency injected repository to return a single mood by id or null if
	 * the mood not found
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	getById({ id }: TGetMoodByIdServiceArgs): Promise<Mood | null>;
	/**
	 * Uses the dependency injected repository to return multiple moods by userId or empty
	 * array if no moods were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getByUserId({ userId }: TGetMoodsByUserIdServiceArgs): Promise<Mood[]>;
	/**
	 * Uses the dependency injected repository to return the default and user created moods
	 * or empty array if no moods were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	getDefaultsWithUser({ userId }: TGetDefaultsWithUserServiceArgs): Promise<Mood[]>;
	/**
	 * Uses the dependency injected repository to create a mood
	 *
	 * @throws InvalidArgumentError if the mood is not valid
	 */
	create({ mood }: TCreateMoodServiceArgs): Promise<Mood>;
	/**
	 * Uses the dependency injected repository to update a mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 * @throws InvalidPayloadError if the mood is not valid
	 */
	update({ id, mood }: TUpdateMoodServiceArgs): Promise<Mood>;
	/**
	 * Uses the dependency injected repository to soft delete a mood
	 * This is the preferred method of deleting a mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	softDelete({ id }: TDeleteMoodServiceArgs): Promise<void>;
	/**
	 * Uses the dependency injected repository to restore a soft deleted mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	restore({ id }: TRestoreMoodServiceArgs): Promise<void>;
	/**
	 * Uses the dependency injected repository to permanently delete a mood
	 * This is not the preferred method of deleting a mood
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	hardDelete({ id }: TDeleteMoodServiceArgs): Promise<void>;
}
