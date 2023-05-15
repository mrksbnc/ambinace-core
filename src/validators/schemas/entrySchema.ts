import type { JSONSchemaType } from 'ajv';
import type { Prisma } from '@prisma/client';

let sharedInstance: EntrySchema | null = null;

export default class EntrySchema {
	static get sharedInstance(): EntrySchema {
		if (sharedInstance === null) {
			sharedInstance = new EntrySchema();
		}
		return sharedInstance;
	}

	public get create(): JSONSchemaType<Prisma.EntryCreateInput> {
		const schema: JSONSchemaType<Prisma.EntryCreateInput> = {
			type: 'object',
			properties: {
				notes: { type: 'string', nullable: true },
				moodId: { type: 'number' },
				userId: { type: 'number' },
				createdAt: { type: 'string', format: 'date-time', nullable: true },
				updatedAt: { type: 'string', format: 'date-time', nullable: true },
				isActive: { type: 'boolean', nullable: true },
			},
			required: ['moodId', 'userId'],
			additionalProperties: false,
		};

		return schema;
	}

	public get update(): JSONSchemaType<Prisma.EntryUpdateInput> {
		const schema: JSONSchemaType<Prisma.EntryUpdateInput> = {
			type: 'object',
			properties: {
				notes: { type: 'string', nullable: true },
				moodId: { type: 'number', nullable: true },
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
