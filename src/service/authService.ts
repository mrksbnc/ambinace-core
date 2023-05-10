import jwt from 'jsonwebtoken';
import AmbianceConfig from '@/config/appConfig';
import type { TAuthService, TDecodeJwtArgs, TJwtPayload, TValidateJwtArgs } from './authService.d';
import { AUTH_CONFIG_KEY } from '@/data/constants/ambianceConfig';

let sharedInstance: AuthService | null = null;

export default class AuthService implements TAuthService {
	private readonly _jwtSecret: string;

	static get sharedInstance(): AuthService {
		if (sharedInstance === null) {
			sharedInstance = new AuthService(AmbianceConfig.sharedInstance.auth.get(AUTH_CONFIG_KEY.JWT_SECRET) as string);
		}
		return sharedInstance;
	}

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
