/**
 * Interface definition for Validatior class.
 */
export interface TValidatorService {
	/**
	 * Returns true if the id is a valid number greater than 0.
	 */
	isValidId(id: string): boolean;
	/**
	 * Returns true if argument is a valid date in the future.
	 */
	isValidFutureDate(date: string | Date): boolean;
	/**
	 * Returns true if argument is a valid date in the past.
	 */
	isValidPastDate(date: string | Date): boolean;
}
