import jwt from 'jsonwebtoken';

import type { TAuthService, TJwtPayload } from './authService.d';
import type { TDecodeJwtArgs, TValidateJwtArgs } from '@/types/args';

export default class AuthService implements TAuthService {
	private readonly _jwtSecret: string;

	constructor(jwtSecret: string) {
		this._jwtSecret = jwtSecret;
	}

	public getJwtSecret(): string {
		return this._jwtSecret;
	}

	public validateJwt(args: TValidateJwtArgs): TJwtPayload | null {
		const payload = (jwt.verify(args.token, this._jwtSecret) as TJwtPayload) ?? null;
		return payload;
	}

	public decodeJwt(args: TDecodeJwtArgs): TJwtPayload | null {
		const payload = (jwt.decode(args.token) as TJwtPayload) ?? null;
		return payload;
	}
}
