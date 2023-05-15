import type { JSONSchemaType } from 'ajv';
import type { Prisma } from '@prisma/client';

let sharedInstance: UserSchema | null = null;

export default class UserSchema {
	static get sharedInstance(): UserSchema {
		if (sharedInstance === null) {
			sharedInstance = new UserSchema();
		}
		return sharedInstance;
	}

	public get create(): JSONSchemaType<Prisma.UserCreateInput> {
		const schema: JSONSchemaType<Prisma.UserCreateInput> = {
			type: 'object',
			properties: {
				email: { type: 'string' },
				password: { type: 'string' },
				name: { type: 'string' },
				createdAt: { type: 'string', nullable: true },
				updatedAt: { type: 'string', nullable: true },
				isActive: { type: 'boolean', nullable: true },
			},
			required: ['email', 'password', 'name'],
			additionalProperties: false,
		};

		return schema;
	}

	public get update(): JSONSchemaType<Prisma.UserUpdateInput> {
		const schema: JSONSchemaType<Prisma.UserUpdateInput> = {
			type: 'object',
			properties: {
				email: { type: 'string', nullable: true },
				password: { type: 'string', nullable: true },
				name: { type: 'string', nullable: true },
				createdAt: { type: 'string', nullable: true },
				updatedAt: { type: 'string', nullable: true },
				isActive: { type: 'boolean', nullable: true },
			},
			required: [],
			additionalProperties: false,
		};

		return schema;
	}
}
