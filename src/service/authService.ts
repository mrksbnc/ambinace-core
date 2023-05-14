import type {
	TSession,
	TAuthService,
	TEncodeResult,
	TDecodeResult,
	TParseTokenArgs,
	TExpirationStatus,
	TDecodeSessionArgs,
	TEncodeSessionArgs,
	TComparePasswordHashArgs,
	TGeneratePasswordHashArgs,
	TCheckExpirationStatusArgs,
	TAuthServiceConstructorArgs,
} from './authService.d';
import bcrypt from 'bcrypt';
import Log from '@/utils/logger';
import AppConfig from '@/config/appConfig';
import jwt, { type Algorithm } from 'jsonwebtoken';
import { AUTH_CONFIG_KEY } from '@/data/constants/config';

let sharedInstance: AuthService | null = null;

export default class AuthService implements TAuthService {
	private readonly _jwtSecret: string;
	private readonly _jwtExpiresIn: number;

	static get sharedInstance(): AuthService {
		if (sharedInstance === null) {
			const jwtSecret: string = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_SECRET];
			const jwtExpiresIn: number = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_EXPIRES_IN];

			sharedInstance = new AuthService({ jwtSecret, jwtExpiresIn });
		}
		return sharedInstance;
	}

	constructor({ jwtSecret, jwtExpiresIn }: TAuthServiceConstructorArgs) {
		this._jwtSecret = jwtSecret;
		this._jwtExpiresIn = jwtExpiresIn;
	}

	public encodeSession({ userId }: TEncodeSessionArgs): TEncodeResult {
		const algorithm: Algorithm = 'HS512';
		const issued: number = Date.now();
		const expires: number = this._jwtExpiresIn;

		const session: TSession = {
			userId,
			issued: issued,
			expiresAt: issued + expires,
		};

		const accessToken: string = jwt.sign(session, this._jwtSecret, {
			algorithm,
			expiresIn: expires,
		});

		const encodeResult: TEncodeResult = {
			accessToken,
			issued: session.issued,
		};

		return encodeResult;
	}

	public decodeSession({ token }: TDecodeSessionArgs): TDecodeResult {
		const algorithm: Algorithm = 'HS512';

		let result: TSession;

		try {
			result = jwt.verify(token, this._jwtSecret, { algorithms: [algorithm] }) as TSession;
		} catch (error) {
			Log.sharedInstance.baseLogger.error(error);
			if (error instanceof jwt.TokenExpiredError) {
				return {
					type: 'expired',
					session: this.parseToken({ token }),
				};
			}

			return {
				type: 'invalid-token',
				session: null,
			};
		}

		return {
			type: 'valid',
			session: result,
		};
	}

	public checkExpirationStatus({ session }: TCheckExpirationStatusArgs): TExpirationStatus {
		const now = Date.now();

		if (session.expiresAt > now) {
			return 'active';
		}
		/**
		 * Default grace period is 3 hours.
		 */
		const gracePeriod = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_GRACE_PERIOD];

		if (session.expiresAt + gracePeriod > now) {
			return 'grace';
		}

		return 'expired';
	}

	public parseToken({ token }: TParseTokenArgs): TSession {
		return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	}

	async generatePasswordHash({ password, saltRounds }: TGeneratePasswordHashArgs): Promise<string> {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		return hash;
	}

	async comparePasswordHash({ password, hash }: TComparePasswordHashArgs): Promise<boolean> {
		const result = await bcrypt.compare(password, hash);
		return result;
	}
}
