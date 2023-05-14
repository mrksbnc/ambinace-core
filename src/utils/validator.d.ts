/**
 * Interface definition for Validatior class.
 */
export interface TValidator {
	/**
	 * Returns true if the id is a valid numeric id (i.e. a positive integer).
	 */
	isValidNumericId(id: number): boolean;
	/**
	 * Returns true if argument is a valid date in the future.
	 */
	isValidFutureDate(date: string | Date): boolean;
	/**
	 * Returns true if argument is a valid date in the past.
	 */
	isValidPastDate(date: string | Date): boolean;
	/**
	 * Returns true if argument is a valid date in the past or now.
	 */
	isValidPastOrNowDate(date: string | Date): boolean;
}
