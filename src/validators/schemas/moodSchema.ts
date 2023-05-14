import type { JSONSchemaType } from 'ajv';
import type { Prisma } from '@prisma/client';

let sharedInstance: MoodSchema | null = null;

export default class MoodSchema {
	static get sharedInstance(): MoodSchema {
		if (sharedInstance === null) {
			sharedInstance = new MoodSchema();
		}
		return sharedInstance;
	}

	public get create(): JSONSchemaType<Prisma.MoodCreateInput> {
		const schema: JSONSchemaType<Prisma.MoodCreateInput> = {
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

	public get update(): JSONSchemaType<Prisma.MoodUpdateInput> {
		const schema: JSONSchemaType<Prisma.MoodUpdateInput> = {
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
