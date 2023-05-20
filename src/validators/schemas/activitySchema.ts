import type { JSONSchemaType } from 'ajv';
import type { Prisma } from '@prisma/client';

let sharedInstance: ActivitySchema | null = null;

export default class ActivitySchema {
	public static get sharedInstance(): ActivitySchema {
		if (sharedInstance === null) {
			sharedInstance = new ActivitySchema();
		}
		return sharedInstance;
	}

	public get create(): JSONSchemaType<Prisma.ActivityCreateInput> {
		const schema: JSONSchemaType<Prisma.ActivityCreateInput> = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				icon: { type: 'string' },
				userId: { type: 'number', nullable: true },
				createdAt: { type: 'string', format: 'date-time', nullable: true },
				updatedAt: { type: 'string', format: 'date-time', nullable: true },
				isActive: { type: 'boolean', nullable: true },
			},
			required: ['name', 'icon'],
			additionalProperties: false,
		};

		return schema;
	}

	public get update(): JSONSchemaType<Prisma.ActivityUpdateInput> {
		const schema: JSONSchemaType<Prisma.ActivityUpdateInput> = {
			type: 'object',
			properties: {
				name: { type: 'string', nullable: true },
				icon: { type: 'string', nullable: true },
				userId: { type: 'number', nullable: true },
				createdAt: { type: 'string', format: 'date-time', nullable: true },
				updatedAt: { type: 'string', format: 'date-time', nullable: true },
				isActive: { type: 'boolean', nullable: true },
			},
			required: [],
			additionalProperties: false,
		};

		return schema;
	}
}
