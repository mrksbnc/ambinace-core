import type jwt from 'jsonwebtoken';
import type { Prisma } from '@prisma/client';
import type { TCacheService } from './cacheService.d';
import type { TLoginResponseDto, TRegisterResponseDto } from '@/api/dto';
import type { TUserRepository } from '@/database/repositories/userRepository.d';

/**
 * The session is the payload of the JWT token.
 * It contains the user ID, the issued timestamp, and the expiration timestamp.
 * The expiration timestamp is the issued timestamp plus the expiration duration.
 * The expiration duration is the value of the JWT_EXPIRES_IN config key.
 */
export declare interface TSession extends jwt.JwtPayload {
	userId: number;
	exp?: number;
	iat?: number;
}
/**
 * The encode result contains the access token and the issued timestamp.
 */
export declare type TEncodeResult = {
	issued: number;
	userId: number;
	accessToken: string;
};
/**
 * The decode result can be one of three types:
 * 1. A valid session.
 * 2. An invalid token.
 * 3. An expired session.
 *
 * The session property will be null if the token is invalid.
 */
// prettier-ignore
export declare type TDecodeResult =
	| {
			type: 'valid';
			session: TSession;
		}
	| {
			type: 'invalid-token';
			session: null;
		}
	| {
			type: 'expired';
			session: TSession;
		};

export declare type TExpirationStatus = 'expired' | 'active' | 'grace';

export declare type TEncodeSessionArgs = {
	userId: number;
};

export declare type TDecodeSessionArgs = {
	token: string;
};

export declare type TCheckExpirationStatusArgs = {
	session: TSession;
};

export declare type TParseTokenArgs = {
	token: string;
};

export declare type TGeneratePasswordHashArgs = {
	password: string;
	saltRounds: number;
};

export declare type TComparePasswordHashArgs = {
	password: string;
	hash: string;
};

export declare type TRegisterArgs = {
	user: Prisma.UserCreateInput;
};

export declare type TAuthenticateArgs = {
	email: string;
	password: string;
};

export declare type TAuthServiceConstructorArgs = {
	jwtSecret: string;
	jwtExpiresIn: number;
	cacheService: TCacheService;
	userRepository: TUserRepository;
};
/**
 * Interface definition for AuthServices
 */
export declare interface TAuthService {
	/**
	 * Encodes a session into a JWT token pair.
	 * Default algorithm is HS512.
	 */
	encodeSession({ userId }: TEncodeSessionArgs): TEncodeResult;
	/**
	 * Decodes a JWT token into a session.
	 */
	decodeSession({ token }: TDecodeSessionArgs): TDecodeResult;
	/**
	 * Checks the expiration status of a session. It can return 'expired', 'active', or 'grace'.
	 */
	checkExpirationStatus({ session }: TCheckExpirationStatusArgs): TExpirationStatus;
	/**
	 * Parses the token from the request header and decodes it into a session without
	 * validating the tokens integrity.
	 */
	parseToken({ token }: TParseTokenArgs): TSession;
	/**
	 * Generates a new hash for a plain text password.
	 */
	generatePasswordHash({ password, saltRounds }: TGeneratePasswordHashArgs): Promise<string>;
	/**
	 * Compares a plain text password with a hash.
	 */
	comparePasswordHash({ password, hash }: TComparePasswordHashArgs): Promise<boolean>;
	/**
	 * Creates a new user.
	 *
	 * @throws InvalidPayloadError if the user payload is not valid.
	 */
	register({ user }: TRegisterArgs): Promise<TRegisterResponseDto>;
	/**
	 * Authenticates a user and returns a login response with a token and the user data.
	 *
	 */
	authenticate({ email, password }: TAuthenticateArgs): Promise<TLoginResponseDto>;
}
