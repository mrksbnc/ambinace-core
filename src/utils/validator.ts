import type { TValidator } from './validator.d';

let sharedInstance: Validator | null = null;

export default class Validator implements TValidator {
	static get sharedInstance(): Validator {
		if (sharedInstance === null) {
			sharedInstance = new Validator();
		}
		return sharedInstance;
	}

	public isValidNumericId(id: string | number): boolean {
		const idNumber: number = typeof id === 'string' ? parseInt(id, 10) : id;
		return !isNaN(idNumber) && idNumber > 0;
	}

	public isValidFutureDate(date: string | Date): boolean {
		const now = Date.now();
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		return !isNaN(dateObj.getTime()) && dateObj.getTime() > now;
	}

	public isValidPastDate(date: string | Date): boolean {
		const now = Date.now();
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		return !isNaN(dateObj.getTime()) && dateObj.getTime() < now;
	}

	public isValidPastOrNowDate(date: string | Date): boolean {
		const now = Date.now();
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		return !isNaN(dateObj.getTime()) && dateObj.getTime() <= now;
	}
}
