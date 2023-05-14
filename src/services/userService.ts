import type {
	TUserService,
	TDeleteUserServiceArgs,
	TUpdateUserServiceArgs,
	TGetUserByIdServiceArgs,
	TRestoreUserServiceArgs,
	TUserServiceConstructorArgs,
	TGetManyUsersByIdsServiceArgs,
} from './userService.';
import AppConfig from '@/config/appConfig';
import Validator from '../validators/validator';
import type { TAuthService } from './authService.d';
import { AUTH_CONFIG_KEY } from '@/data/constants/config';
import InvalidNumericArgumentError from '@/error/invalidNumericIdError';
import type { PartialUser, TUserRepository } from '@/database/repositories/userRepository.d';

export default class UserService implements TUserService {
	private readonly _authService: TAuthService;
	private readonly _userRepository: TUserRepository;

	constructor({ userRepository, authService }: TUserServiceConstructorArgs) {
		this._userRepository = userRepository;
		this._authService = authService;
	}

	public async getById({ id }: TGetUserByIdServiceArgs): Promise<PartialUser | null> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidNumericArgumentError();
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult = await this._userRepository.findById({ id: idNum });

		return repositoryResult;
	}

	public async getManyByIds({ ids }: TGetManyUsersByIdsServiceArgs): Promise<PartialUser[]> {
		const invalidId = ids.find((id) => !Validator.sharedInstance.isValidId(id));

		if (invalidId !== undefined) {
			throw new InvalidNumericArgumentError();
		}

		const idsNum: number[] = ids.map((id) => parseInt(id, 10));
		const repositoryResult = await this._userRepository.findManyByIds({ ids: idsNum });

		return repositoryResult;
	}

	public async update({ id, user }: TUpdateUserServiceArgs): Promise<PartialUser> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidNumericArgumentError();
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
			throw new InvalidNumericArgumentError();
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreUserServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidNumericArgumentError();
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.restore({ id: idNum });
	}

	public async hardDelete({ id }: TDeleteUserServiceArgs): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidNumericArgumentError();
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.hardDelete({ id: idNum });
	}
}
