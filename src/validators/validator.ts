import Ajv from 'ajv';
import isInt from 'validator/lib/isInt';
import isDate from 'validator/lib/isDate';
import isEmail from 'validator/lib/isEmail';
import isAfter from 'validator/lib/isAfter';
import isBefore from 'validator/lib/isBefore';
import type { TValidator, TypedJSONSchema } from './validator.d';

let sharedInstance: Validator | null = null;

export default class Validator implements TValidator {
	private readonly _ajv: Ajv;

	static get sharedInstance(): Validator {
		if (sharedInstance === null) {
			sharedInstance = new Validator();
		}
		return sharedInstance;
	}

	private constructor() {
		this._ajv = new Ajv();
	}

	public isValidId(id: string): boolean {
		return isInt(id, { min: 1 });
	}

	public isValidEmail(email: string): boolean {
		return isEmail(email);
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

	public isValidSchema<T>(schema: TypedJSONSchema, data: T): boolean {
		const validate = this._ajv.compile(schema);

		validate(data);
		return validate.errors != null;
	}
}
