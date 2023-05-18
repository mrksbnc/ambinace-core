import type { Mood, Prisma } from '@prisma/client';

export declare type TFindMoodByIdArgs = {
	id: number;
};

export declare type TFindDefaultsWithUserArgs = {
	userId: number;
};

export declare type TFindMoodsByUserIdArgs = {
	userId: number;
};

export declare type TCreateMoodArgs = {
	mood: Prisma.MoodCreateInput;
};

export declare type TUpdateMoodArgs = {
	id: number;
	mood: Prisma.MoodUpdateInput;
};

export declare type TDeleteMoodArgs = {
	id: number;
};

export declare type TRestoreMoodArgs = {
	id: number;
};

export declare type TMoodRepositoryConstructorArgs = {
	delegate: MoodRepository;
};

/**
 * Interface definition for MoodRepositories
 */
export declare interface TMoodRepository {
	/**
	 * Uses the dependency injected delegate to return a single mood by id or null if
	 * the mood not found
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	findById({ id }: TFindMoodByIdArgs): Promise<Mood | null>;
	/**
	 * Uses the dependency injected delegate to return multiple moods by userId or empty
	 * array if no moods were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	findByUserId({ userId }: TFindMoodsByUserIdArgs): Promise<Mood[]>;
	/**
	 * Uses the dependency injected delegate to return the default and user created moods
	 * or empty array if no moods were found
	 *
	 * @throws InvalidArgumentError if the userId is not a valid numeric id
	 */
	findDefaultsWithUser({ userId }: TFindDefaultsWithUserArgs): Promise<Mood[]>;
	/**
	 * Uses the dependency injected delegate to create a mood
	 *
	 * @throws InvalidPayloadError if the payload is invalid or missing required fields
	 */
	create({ mood }: TCreateMoodArgs): Promise<Mood>;
	/**
	 * Uses the dependency injected delegate to update a mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 * @throws InvalidPayloadError if the payload is invalid or missing required fields
	 */
	update({ id, mood }: TUpdateMoodArgs): Promise<Mood>;
	/**
	 * Uses the dependency injected delegate to soft delete a mood
	 * This is the preferred method of deleting a mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	softDelete({ id }: TDeleteMoodArgs): Promise<void>;
	/**
	 * Uses the dependency injected delegate to restore a soft deleted mood
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	restore({ id }: TRestoreMoodArgs): Promise<void>;
	/**
	 * Uses the dependency injected delegate to permanently delete a mood
	 * This should only be used when absolutely necessary. The preferred method
	 * of deleting a mood is to soft delete it
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id
	 */
	hardDelete({ id }: TDeleteMoodArgs): Promise<void>;
}
