/*
 * Jwt payload type
 */
export type TJwtPayload = {
	userId: number;
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
/*
 * Interface for AuthService.
 */
export type TAuthService = {
	/**
	 * Get the JWT secret from the instance.
	 */
	readonly getJwtSecret: () => string;
	/**
	 * Validates a JWT token.
	 */
	readonly validateJwt: (args: TValidateJwtArgs) => TJwtPayload | null;
	/**
	 * Decodes a JWT token.
	 */
	readonly decodeJwt: (args: TDecodeJwtArgs) => TJwtPayload | null;
};
