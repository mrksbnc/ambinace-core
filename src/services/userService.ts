import type {
	TUserService,
	TDeleteUserServiceArgs,
	TUpdateUserServiceArgs,
	TGetUserByIdServiceArgs,
	TRestoreUserServiceArgs,
	TUserServiceConstructorArgs,
	TGetManyUsersByIdsServiceArgs,
} from './userService';
import AppConfig from '@/config/appConfig';
import Validator from '../validators/validator';
import type { TAuthService } from './authService';
import { AUTH_CONFIG_KEY } from '@/data/constants/config';
import UserSchema from '@/validators/schemas/userSchema';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import type { TPartialUser, TUserRepository } from '@/database/repositories/userRepository.d';
import AuthService from './authService';
import UserRepository from '@/database/repositories/userRepository';

let sharedInstance: UserService | null = null;
export default class UserService implements TUserService {
	private readonly _authService: TAuthService;
	private readonly _userRepository: TUserRepository;

	static get sharedInstance(): UserService {
		if (sharedInstance === null) {
			const authService: TAuthService = AuthService.sharedInstance;
			const userRepository: TUserRepository = UserRepository.sharedInstance;

			sharedInstance = new UserService({ authService, userRepository });
		}
		return sharedInstance;
	}

	constructor({ userRepository, authService }: TUserServiceConstructorArgs) {
		this._userRepository = userRepository;
		this._authService = authService;
	}

	public async getById({ id }: TGetUserByIdServiceArgs): Promise<TPartialUser | null> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult = await this._userRepository.findById({ id: idNum });

		return repositoryResult;
	}

	public async getManyByIds({ ids }: TGetManyUsersByIdsServiceArgs): Promise<TPartialUser[]> {
		const invalidId = ids.find((id) => !Validator.sharedInstance.isValidId(id));

		if (invalidId !== undefined) {
			throw new InvalidArgumentError('ids');
		}

		const idsNum: number[] = ids.map((id) => parseInt(id, 10));
		const repositoryResult = await this._userRepository.findManyByIds({ ids: idsNum });

		return repositoryResult;
	}

	public async update({ id, user }: TUpdateUserServiceArgs): Promise<TPartialUser> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		if (!Validator.sharedInstance.isValidSchema(UserSchema.sharedInstance.update, user)) {
			throw new InvalidPayloadError();
		}

		if (user.password != null) {
			const saltRounds = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.SALT_ROUNDS];

			user.password = await this._authService.generatePasswordHash({
				password: String(user.password),
				saltRounds,
			});
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult = await this._userRepository.update({ id: idNum, user });

		return repositoryResult;
	}

	public async softDelete({ id }: TDeleteUserServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreUserServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.restore({ id: idNum });
	}

	public async hardDelete({ id }: TDeleteUserServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.hardDelete({ id: idNum });
	}
}
