import type { JSONSchemaType } from 'ajv';
import type { Prisma } from '@prisma/client';

export type TypedJSONSchema = JSONSchemaType<
	| Prisma.UserCreateInput
	| Prisma.ActivityCreateInput
	| Prisma.EntryCreateInput
	| Prisma.MoodCreateInput
	| Prisma.UserUpdateInput
	| Prisma.ActivityUpdateInput
	| Prisma.EntryUpdateInput
	| Prisma.MoodUpdateInput
>;

/**
 * Interface definition for Validatior class.
 */
export interface TValidator {
	/**
	 * Returns true if the id is a valid number greater than 0.
	 */
	isValidId(id: string): boolean;
	/**
	 * Returns true if argument is a valid email.
	 */
	isValidEmail(email: string): boolean;
	/**
	 * Returns true if argument is a valid date in the future.
	 */
	isValidFutureDate(date: string | Date): boolean;
	/**
	 * Returns true if argument is a valid date in the past.
	 */
	isValidPastDate(date: string | Date): boolean;
	/**
	 * Return true if argument schema is valid.
	 */
	isValidSchema<T>(schema: TypedJSONSchema, data: T): boolean;
}
