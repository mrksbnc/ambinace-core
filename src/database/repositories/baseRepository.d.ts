import type { Prisma } from '@prisma/client';

export type TDelegate = Prisma.ActivityDelegate<false> | Prisma.EntryDelegate<false>;

export type TBaseRepository<TDelegate> = {
	readonly delegate: TDelegate;
};
