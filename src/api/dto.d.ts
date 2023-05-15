import type { Prisma } from '@prisma/client';
import type { TPartialUser } from '@/database/repositories/userRepository';

export interface TRegisterRequestDto {
	user: Prisma.UserCreateInput;
}

export interface TRegisterResponseDto {
	user: TPartialUser;
	token: string;
}

export interface TLoginRequestDto {
	email: string;
	password: string;
}

export interface TLoginResponseDto {
	user: TPartialUser;
	token: string;
}
