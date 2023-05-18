import type {
	TGetUserRequestDto,
	TGetUserResponseDto,
	TUpdateUserRequestDto,
	TDeleteUserRequestDto,
	TUpdateUserResponseDto,
	TRestoreUserRequestDto,
	TGetManyByIdsRequestDto,
	TGetManyUserByIdsResponseDto,
} from '@/api/dto.d';
import AuthService from './authService';
import AppConfig from '@/config/appConfig';
import Validator from '../validators/validator';
import type { TAuthService } from './authService.d';
import UserSchema from '@/validators/schemas/userSchema';
import { AUTH_CONFIG_KEY } from '@/data/constants/config';
import InvalidPayloadError from '@/error/invalidPayloadError';
import InvalidArgumentError from '@/error/invalidArgumentError';
import UserRepository from '@/database/repositories/userRepository';
import type { TUserService, TUserServiceConstructorArgs } from './userService.d';
import type { TPartialUser, TUserRepository } from '@/database/repositories/userRepository.d';

let sharedInstance: UserService | null = null;
export default class UserService implements TUserService {
	private readonly _authService: TAuthService;
	private readonly _userRepository: TUserRepository;

	public static get sharedInstance(): UserService {
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

	public async getById({ id }: TGetUserRequestDto): Promise<TGetUserResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult: TPartialUser | null = await this._userRepository.findById({ id: idNum });

		const dto: TGetUserResponseDto = {
			user: repositoryResult,
		};

		return dto;
	}

	public async getManyByIds({ ids }: TGetManyByIdsRequestDto): Promise<TGetManyUserByIdsResponseDto> {
		const invalidId = ids.find((id) => !Validator.sharedInstance.isValidId(id));

		if (invalidId !== undefined) {
			throw new InvalidArgumentError('ids');
		}

		const idsNum: number[] = ids.map((id) => parseInt(id, 10));
		const repositoryResult: TPartialUser[] = await this._userRepository.findManyByIds({ ids: idsNum });

		const dto: TGetManyUserByIdsResponseDto = {
			users: repositoryResult,
		};

		return dto;
	}

	public async update({ id, user }: TUpdateUserRequestDto): Promise<TUpdateUserResponseDto> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const schemaValidationResult: string[] = Validator.sharedInstance.isValidSchema(
			UserSchema.sharedInstance.update,
			user,
		);
		if (schemaValidationResult.length > 0) {
			throw new InvalidPayloadError(schemaValidationResult);
		}

		if (user.password != null) {
			const saltRounds = AppConfig.sharedInstance.auth[AUTH_CONFIG_KEY.SALT_ROUNDS];

			user.password = await this._authService.generatePasswordHash({
				password: String(user.password),
				saltRounds,
			});
		}

		const idNum: number = parseInt(id, 10);
		const repositoryResult: TPartialUser = await this._userRepository.update({ id: idNum, user });

		const dto: TUpdateUserResponseDto = {
			user: repositoryResult,
		};

		return dto;
	}

	public async softDelete({ id }: TDeleteUserRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.softDelete({ id: idNum });
	}

	public async restore({ id }: TRestoreUserRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.restore({ id: idNum });
	}

	public async hardDelete({ id }: TDeleteUserRequestDto): Promise<void> {
		if (!Validator.sharedInstance.isValidId(id)) {
			throw new InvalidArgumentError('id');
		}

		const idNum: number = parseInt(id, 10);
		await this._userRepository.hardDelete({ id: idNum });
	}
}
