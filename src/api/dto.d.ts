import type { Mood, Prisma } from '@prisma/client';
import type { TPartialUser } from '@/database/repositories/userRepository';

export type TRegisterRequestDto = {
	user: Prisma.UserCreateInput;
};

export type TRegisterResponseDto = {
	user: TPartialUser;
	token: string;
};

export type TLoginRequestDto = {
	email: string;
	password: string;
};

export type TLoginResponseDto = {
	user: TPartialUser;
	token: string;
};

export type TGetUserRequestDto = {
	id: string;
};

export type TGetUserResponseDto = {
	user: TPartialUser;
};

export type TGetManyByIdsRequestDto = {
	ids: string[];
};

export type TGetManyUserByIdsResponseDto = {
	users: TPartialUser[];
};

export type TUpdateUserRequestDto = {
	id: string;
	user: Prisma.UserUpdateInput;
};

export type TUpdateUserResponseDto = {
	user: TPartialUser;
};

export type TDeleteUserRequestDto = {
	id: string;
};

export type TRestoreUserRequestDto = {
	id: string;
};

export type TGetMoodByIdRequestDto = {
	id: string;
};

export type TGetMoodsByUserIdRequestDto = {
	userId: string;
};

export type TGetMoodByIdResponseDto = {
	mood: Mood | null;
};

export type TGetMoodsByUserIdResponseDto = {
	moods: Mood[];
};

export type TGetDefaultsWithUserRequestDto = {
	userId: string;
};

export type TGetDefaultMoodsWithUserResponseDto = {
	moods: Mood[];
};

export type TCreateMoodRequestDto = {
	mood: Prisma.MoodCreateInput;
};

export type TCreateMoodResponseDto = {
	mood: Mood;
};

export type TUpdateMoodRequestDto = {
	id: string;
	mood: Prisma.MoodUpdateInput;
};

export type TUpdateMoodResponseDto = {
	mood: Mood;
};

export type TDeleteMoodRequestDto = {
	id: string;
};

export type TRestoreMoodRequestDto = {
	id: string;
};

export type TGetActivityByIdRequestDto = {
	id: string;
};

export type TGetActivityByIdResponseDto = {
	activity: Activity | null;
};

export type TGetDefaultsWithUserRequestDto = {
	userId: string;
};

export type TGetDefaultActivitiesWithUserResponseDto = {
	activities: Activity[];
};

export type TGetManyActivityByIdListRequestDto = {
	ids: string[];
};

export type TGetActivitiesByIdListResponseDto = {
	activities: Activity[];
};

export type TGetActivitiesByUserIdRequestDto = {
	userId: string;
};

export type TGetActivitiesByUserIdResponseDto = {
	activities: Activity[];
};

export type TCreateActivityRequestDto = {
	activity: Prisma.ActivityCreateInput;
};

export type TCreateActivityResponseDto = {
	activity: Activity;
};

export type TUpdateActivityRequestDto = {
	id: string;
	activity: Prisma.ActivityUpdateInput;
};

export type TUpdateActivityResponseDto = {
	activity: Activity;
};

export type TDeleteActivityRequestDto = {
	id: string;
};

export type TRestoreActivityRequestDto = {
	id: string;
};
