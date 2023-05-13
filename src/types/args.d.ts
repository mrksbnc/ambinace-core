/**
 * Arguments for getActivitiesByUserId.
 */
export type TGetActivitiesByUserIdArgs = {
	userId: number;
};
/**
 * Arguments for getActivityById.
 */
export type TGetActivityByIdArgs = {
	id: number;
};
/**
 * Arguments for createActivity.
 */
export type TCreateActivityArgs = {
	activity: Activity;
};
/**
 * Arguments for updateActivity.
 */
export type TUpdateActivityArgs = {
	id: number;
	activity: Activity;
};
/**
 * Arguments for softDeleteActivity.
 */
export type TSoftDeleteActivityArgs = {
	id: number;
};
/**
 * Arguments for hardDeleteActivity.
 */
export type THardDeleteActivityArgs = {
	id: number;
};
/**
 * Arguments for getEntriesByUserId.
 */
export type TGetEntriesArgs = {
	/**
	 * Supabase user id.
	 */
	userId: number;
};
/**
 * Arguments for getEntriesByDate.
 */
export type TGetEntriesByDateArgs = {
	date: Date;
	userId: number;
};
/**
 * Arguments for getEntriesByMood.
 */
export type TGetEntriesByMoodArgs = {
	mood: Mood;
	userId: number;
};
/**
 * Arguments for getEntriesByDaterange.
 */
export type TGetEntriesByDaterangeArgs = {
	startDate: Date;
	endDate: Date;
	userId: number;
};

export type TGetActiveEntriesArgs = {
	userId: number;
};
/**
 * Arguments for getEntryById.
 */
export type TGetEntryByIdArgs = {
	id: number;
};
/**
 * Arguments for createEntry.
 */
export type TCreateEntryArgs = {
	entry: Entry;
};
/**
 * Arguments for updateEntry.
 */
export type TUpdateEntryArgs = {
	id: number;
	entry: Entry;
};
/**
 * Arguments for softDeleteEntry.
 */
export type TSoftDeleteEntryArgs = {
	id: number;
};
/**
 * Hard-deletes an Entry
 * @remarks
 * This is not recommended, use softDeleteEntry instead.
 * @see softDeleteEntry
 */
export type THardDeleteEntryArgs = {
	id: number;
};
/*
 * Arguments for validateJwt.
 */
export type TValidateJwtArgs = {
	token: string;
};
/*
 * Arguments for decodeJwt.
 */
export type TDecodeJwtArgs = {
	token: string;
};
