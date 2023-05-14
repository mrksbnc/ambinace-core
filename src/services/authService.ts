import type {
	TSession,
	TAuthService,
	TEncodeResult,
	TDecodeResult,
	TRegisterArgs,
	TParseTokenArgs,
	TExpirationStatus,
	TAuthenticateArgs,
	TDecodeSessionArgs,
	TEncodeSessionArgs,
	TComparePasswordHashArgs,
	TGeneratePasswordHashArgs,
	TCheckExpirationStatusArgs,
	TAuthServiceConstructorArgs,
} from './authService';
import bcrypt from 'bcrypt';
import Log from '@/utils/logger';
import AppConfig from '@/config/appConfig';
import type { Prisma } from '@prisma/client';
import jwt, { type Algorithm } from 'jsonwebtoken';
import { AUTH_CONFIG_KEY } from '@/data/constants/config';
import InvalidArgumentError from '@/error/invalidArgumentError';
import ResourceNotFoundError from '@/error/resourceNotFoundError';
import UserRepository from '@/database/repositories/userRepository';
import type { TUserRepository } from '@/database/repositories/userRepository.d';

let sharedInstance: AuthService | null = null;

export default class AuthService implements TAuthService {
	private readonly _jwtSecret: string;
	private readonly _jwtExpiresIn: number;
	private readonly _userReposiory: TUserRepository;

	static get sharedInstance(): AuthService {
		if (sharedInstance === null) {
			const jwtSecret: string = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_SECRET];
			const jwtExpiresIn: number = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_EXPIRES_IN];

			sharedInstance = new AuthService({ jwtSecret, jwtExpiresIn, userRepository: UserRepository.sharedInstance });
		}
		return sharedInstance;
	}

	constructor({ jwtSecret, jwtExpiresIn, userRepository }: TAuthServiceConstructorArgs) {
		this._jwtSecret = jwtSecret;
		this._jwtExpiresIn = jwtExpiresIn;
		this._userReposiory = userRepository;
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

	public async register({ user }: TRegisterArgs): Promise<void> {
		const saltRounds = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.SALT_ROUNDS];

		const password: string = user.password;
		const hash = await this.generatePasswordHash({ password, saltRounds });

		const newUser: Prisma.UserCreateInput = {
			...user,
			password: hash,
		};

		await this._userReposiory.create({
			user: newUser,
		});
	}

	async authenticate({ email, password }: TAuthenticateArgs): Promise<TEncodeResult> {
		const user = await this._userReposiory.findByEmail({ email });

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const isValidPassword = this.comparePasswordHash({
			password,
			hash: 'hash',
		});

		if (!isValidPassword) {
			throw new InvalidArgumentError();
		}

		const encodedSession = this.encodeSession({ userId: user.id });
		return encodedSession;
	}
}
