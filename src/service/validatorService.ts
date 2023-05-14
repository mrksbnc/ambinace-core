import isInt from 'validator/lib/isInt';
import isDate from 'validator/lib/isDate';
import isAfter from 'validator/lib/isAfter';
import isBefore from 'validator/lib/isBefore';
import type { TValidatorService } from './validatorService.d';

let sharedInstance: ValidatorService | null = null;

export default class ValidatorService implements TValidatorService {
	static get sharedInstance(): ValidatorService {
		if (sharedInstance === null) {
			sharedInstance = new ValidatorService();
		}
		return sharedInstance;
	}

	public isValidId(id: string): boolean {
		return isInt(id, { min: 1 });
	}

	public isValidDate(date: string): boolean {
		return isDate(date);
	}

	public isValidFutureDate(date: string): boolean {
		return isDate(date) && isAfter(date, new Date().toISOString());
	}

	public isValidPastDate(date: string, past?: string): boolean {
		return isDate(date) && isBefore(date, past || new Date().toISOString());
	}
}
