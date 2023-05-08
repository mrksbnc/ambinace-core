import type { BaseResponseConstructorArgs, TBaseResponse } from './baseResponse.d';
import type HTTP_STATUS_CODE from '../enums/httpStatusCode';

export default class BaseResponse<T> implements TBaseResponse<T> {
	public readonly data: T | null;
	public readonly message: string;
	public readonly success: boolean;
	public readonly error: string | null;
	public readonly status: HTTP_STATUS_CODE;

	constructor(args: BaseResponseConstructorArgs<T>) {
		this.status = args.status;
		this.message = args.message;
		this.data = args.data ?? null;
		this.error = args.error ?? null;
		this.success = args.status >= 200 && args.status <= 299;
	}
}
