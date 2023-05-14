export type TSession = {
	userId: number;
	issued: number;
	expiresAt: number;
};

export type TEncodeResult = {
	accessToken: string;
	issued: number;
};

// prettier-ignore
export type TDecodeResult =
	| {
			type: 'valid';
			session: Session;
		}
	| {
			type: 'invalid-token';
			session: null;
		}
	| {
			type: 'expired';
			session: Session;
		};

export type TExpirationStatus = 'expired' | 'active' | 'grace';

export type TEncodeSessionArgs = {
	userId: number;
};

export type TDecodeSessionArgs = {
	token: string;
};

export type TCheckExpirationStatusArgs = {
	session: TSession;
};

export type TParseTokenArgs = {
	token: string;
};

export type TGeneratePasswordHashArgs = {
	password: string;
	saltRounds: number;
};

export type TComparePasswordHashArgs = {
	password: string;
	hash: string;
};

export type TAuthServiceConstructorArgs = {
	jwtSecret: string;
	jwtExpiresIn: number;
};
/**
 * Interface definition for AuthServices
 */
export interface TAuthService {
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
}
