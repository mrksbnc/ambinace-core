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
} from './authService.d';
import bcrypt from 'bcrypt';
import Log from '@/utils/logger';
import CacheService from './cacheService';
import AppConfig from '@/config/appConfig';
import Validator from '@/validators/validator';
import type { TLoginResponseDto } from '@/api/dto';
import type { Prisma, User } from '@prisma/client';
import { CACHE_KEY } from '@/data/constants/cache';
import jwt, { type Algorithm } from 'jsonwebtoken';
import type { TCacheService } from './cacheService.d';
import UserSchema from '@/validators/schemas/userSchema';
import { AUTH_CONFIG_KEY } from '@/data/constants/config';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InternalServerError from '@/error/internalServerError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import ResourceNotFoundError from '@/error/resourceNotFoundError';
import UserRepository from '@/database/repositories/userRepository';
import type { TPartialUser } from '@/database/repositories/userRepository.d';
import type { TUserRepository } from '@/database/repositories/userRepository.d';

let sharedInstance: AuthService | null = null;

export default class AuthService implements TAuthService {
	private readonly _jwtSecret: string;
	private readonly _jwtExpiresIn: number;
	private readonly _cacheService: TCacheService;
	private readonly _userReposiory: TUserRepository;

	public static get sharedInstance(): AuthService {
		if (sharedInstance === null) {
			const jwtSecret: string = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_SECRET];
			const jwtExpiresIn: number = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_EXPIRES_IN];

			sharedInstance = new AuthService({
				jwtSecret,
				jwtExpiresIn,
				cacheService: CacheService.sharedInstance,
				userRepository: UserRepository.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ jwtSecret, jwtExpiresIn, userRepository, cacheService }: TAuthServiceConstructorArgs) {
		this._jwtSecret = jwtSecret;
		this._jwtExpiresIn = jwtExpiresIn;
		this._cacheService = cacheService;
		this._userReposiory = userRepository;
	}

	public encodeSession({ userId }: TEncodeSessionArgs): TEncodeResult {
		const algorithm: Algorithm = 'HS512';

		const session: TSession = {
			userId,
		};

		const accessToken: string = jwt.sign(session, this._jwtSecret, {
			algorithm,
			expiresIn: this._jwtExpiresIn,
		});

		const encodeResult: TEncodeResult = {
			userId,
			accessToken,
			issued: Date.now(),
		};

		return encodeResult;
	}

	public decodeSession({ token }: TDecodeSessionArgs): TDecodeResult {
		const algorithm: Algorithm = 'HS512';

		let session: TSession;

		try {
			session = jwt.verify(token, this._jwtSecret, { algorithms: [algorithm] }) as TSession;
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
			session,
		};
	}

	public checkExpirationStatus({ session }: TCheckExpirationStatusArgs): TExpirationStatus {
		const now = Date.now();

		if (session?.exp && session?.exp > now) {
			return 'active';
		}
		/**
		 * Default grace period is 3 hours.
		 */
		const gracePeriod = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.JWT_GRACE_PERIOD];

		if (session?.exp && session.exp + gracePeriod > now) {
			return 'grace';
		}

		return 'expired';
	}

	public parseToken({ token }: TParseTokenArgs): TSession {
		return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	}

	public async generatePasswordHash({ password, saltRounds }: TGeneratePasswordHashArgs): Promise<string> {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		return hash;
	}

	public async comparePasswordHash({ password, hash }: TComparePasswordHashArgs): Promise<boolean> {
		const result = await bcrypt.compare(password, hash);
		return result;
	}

	public async register({ user }: TRegisterArgs): Promise<TLoginResponseDto> {
		const schemaValidationResult = Validator.sharedInstance.isValidSchema(UserSchema.sharedInstance.create, user);

		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		const existingUser: User | null = await this._userReposiory.findByEmail({ email: user.email });

		if (existingUser) {
			throw new InvalidArgumentError('email');
		}

		const password: string = user.password;
		const saltRounds = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.SALT_ROUNDS];

		const hash = await this.generatePasswordHash({ password, saltRounds });

		const newUser: Prisma.UserCreateInput = {
			...user,
			password: hash,
		};

		const createdUser = await this._userReposiory.create({
			user: newUser,
		});

		this._cacheService.setSafe(
			this._cacheService.generateKey(CACHE_KEY.USER_WITH_ID, `${createdUser.id}`),
			JSON.stringify(createdUser),
		);

		const { accessToken: token } = this.encodeSession({
			userId: createdUser.id,
		});

		const dto: TLoginResponseDto = {
			token,
			user: createdUser,
		};

		return dto;
	}

	public async authenticate({ email, password }: TAuthenticateArgs): Promise<TLoginResponseDto> {
		if (!Validator.sharedInstance.isValidEmail(email)) {
			throw new InvalidArgumentError('email');
		}

		let servedFromCache = true;
		let user: User | null = await this._cacheService.get<User | null>(
			this._cacheService.generateKey(CACHE_KEY.USER_WITH_EMAIL, email),
		);

		if (user == null) {
			servedFromCache = false;
			user = await this._userReposiory.findByEmail({ email });

			if (user == null) {
				throw new ResourceNotFoundError();
			}
		}

		const isValidPassword = await this.comparePasswordHash({
			password,
			hash: user.password,
		});

		if (!isValidPassword) {
			throw new InvalidArgumentError('password');
		}

		const mappedUser = this._userReposiory.mapUser(user);
		const encodedSession = this.encodeSession({ userId: user.id });

		if (mappedUser == null) {
			throw new InternalServerError();
		}

		if (!servedFromCache) {
			this._cacheService.setSafe<User>(this._cacheService.generateKey(CACHE_KEY.USER_WITH_EMAIL, email), user);

			this._cacheService.setSafe<TPartialUser>(
				this._cacheService.generateKey(CACHE_KEY.USER_WITH_ID, `${user?.id}`),
				mappedUser,
			);
		}

		const dto: TLoginResponseDto = {
			token: encodedSession.accessToken,
			user: this._userReposiory.mapUser(user),
		};

		return dto;
	}
}
