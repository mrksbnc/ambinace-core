import type { Mood, Prisma } from '@prisma/client';
import type { TPartialUser } from '@/database/repositories/userRepository';

export declare type TRegisterRequestDto = {
	user: Prisma.UserCreateInput;
};

export declare type TRegisterResponseDto = {
	user: TPartialUser;
	token: string;
};

export declare type TLoginRequestDto = {
	email: string;
	password: string;
};

export declare type TLoginResponseDto = {
	user: TPartialUser;
	token: string;
};

export declare type TGetUserRequestDto = {
	id: string;
};

export declare type TGetUserResponseDto = {
	user: TPartialUser;
};

export declare type TGetManyByIdsRequestDto = {
	ids: string[];
};

export declare type TGetManyUserByIdsResponseDto = {
	users: TPartialUser[];
};

export declare type TUpdateUserRequestDto = {
	id: string;
	user: Prisma.UserUpdateInput;
};

export declare type TUpdateUserResponseDto = {
	user: TPartialUser;
};

export declare type TDeleteUserRequestDto = {
	id: string;
};

export declare type TRestoreUserRequestDto = {
	id: string;
};

export declare type TGetMoodByIdRequestDto = {
	id: string;
};

export declare type TGetMoodsByUserIdRequestDto = {
	userId: string;
};

export declare type TGetMoodByIdResponseDto = {
	mood: Mood | null;
};

export declare type TGetMoodsByUserIdResponseDto = {
	moods: Mood[];
};

export declare type TGetDefaultsWithUserRequestDto = {
	userId: string;
};

export declare type TGetDefaultMoodsWithUserResponseDto = {
	moods: Mood[];
};

export declare type TCreateMoodRequestDto = {
	mood: Prisma.MoodCreateInput;
};

export declare type TCreateMoodResponseDto = {
	mood: Mood;
};

export declare type TUpdateMoodRequestDto = {
	id: string;
	mood: Prisma.MoodUpdateInput;
};

export declare type TUpdateMoodResponseDto = {
	mood: Mood;
};

export declare type TDeleteMoodRequestDto = {
	id: string;
};

export declare type TRestoreMoodRequestDto = {
	id: string;
};

export declare type TGetActivityByIdRequestDto = {
	id: string;
};

export declare type TGetActivityByIdResponseDto = {
	activity: Activity | null;
};

export declare type TGetDefaultsWithUserRequestDto = {
	userId: string;
};

export declare type TGetDefaultActivitiesWithUserResponseDto = {
	activities: Activity[];
};

export declare type TGetManyActivityByIdListRequestDto = {
	ids: string[];
};

export declare type TGetActivitiesByIdListResponseDto = {
	activities: Activity[];
};

export declare type TGetActivitiesByUserIdRequestDto = {
	userId: string;
};

export declare type TGetActivitiesByUserIdResponseDto = {
	activities: Activity[];
};

export declare type TCreateActivityRequestDto = {
	activity: Prisma.ActivityCreateInput;
};

export declare type TCreateActivityResponseDto = {
	activity: Activity;
};

export declare type TUpdateActivityRequestDto = {
	id: string;
	activity: Prisma.ActivityUpdateInput;
};

export declare type TUpdateActivityResponseDto = {
	activity: Activity;
};

export declare type TDeleteActivityRequestDto = {
	id: string;
};

export declare type TRestoreActivityRequestDto = {
	id: string;
};
