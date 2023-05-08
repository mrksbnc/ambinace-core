import type { THttpError } from './httpError.d';

export default class HttpError implements THttpError {
	public readonly status: number;
	public readonly message: string;
	public readonly createdAt: string;

	constructor(status: number, message: string) {
		this.status = status;
		this.message = message;
		this.createdAt = new Date().toISOString();
	}
}
