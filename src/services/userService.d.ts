import type {
	TGetUserResponseDto,
	TDeleteUserRequestDto,
	TUpdateUserRequestDto,
	TRestoreUserRequestDto,
	TUpdateUserResponseDto,
	TGetManyByIdsRequestDto,
} from '@/api/dto.d';
import type { TAuthService } from './authService.d';
import type { TUserRepository } from '@/database/repositories/userRepository.d';

export declare type TDeleteUserServiceArgs = {
	id: string;
};

export declare type TRestoreUserServiceArgs = {
	id: string;
};

export declare type TUserServiceConstructorArgs = {
	userRepository: TUserRepository;
	authService: TAuthService;
};
/**
 * Interface definition for the user service.
 */
export declare interface TUserService {
	/**
	 * Returns a single user or null if user not exists in the database
	 * using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	getById({ id }: TGetUserRequestDto): Promise<TGetUserResponseDto>;
	/**
	 * Returns a single user or null if user not exists in the database
	 * using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	getManyByIds({ ids }: TGetManyByIdsRequestDto): Promise<TGetManyByIdsResponseDto>;
	/**
	 * Updates an existing user in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 * @throws InvalidPayloadError if the user payload is not valid.
	 */
	update({ id, user }: TUpdateUserRequestDto): Promise<TUpdateUserResponseDto>;
	/**
	 * Soft deletes an existing user in the database using the injected repository.
	 * This is the preferred way to delete a user.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	softDelete({ id }: TDeleteUserRequestDto): Promise<void>;
	/**
	 * Restores a soft deleted user in the database using the injected repository.
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	restore({ id }: TRestoreUserRequestDto): Promise<void>;
	/**
	 * Permanently deletes an existing user in the database using the injected repository.
	 *
	 * This is not the preferred way to delete a user.
	 * Use softDelete instead.
	 * @see softDelete
	 *
	 * @throws InvalidArgumentError if the id is not a valid numeric id.
	 */
	hardDelete({ id }: TDeleteUserRequestDto): Promise<void>;
}
