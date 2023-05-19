# Prisma

The project uses [Prisma](https://www.prisma.io/) as the ORM. Prisma is a modern database toolkit that makes database access easy with an auto-generated and type-safe query builder that's tailored to your data.

## Requirements

- [Node.js, latest LTS](https://nodejs.org/en/)
- [Yarn, latest version](https://yarnpkg.com/en/docs/install)
- [PostgreSQL, latest version](https://www.postgresql.org/download/)

## Scripts

Prisma provides a set of scripts to manage the database.

Create a new migration:

```bash
yarn prisma migrate dev --name <migration-name>
```

Run the migrations:

```bash
yarn prisma migrate dev
```

Generate the Prisma client:

```bash
yarn prisma generate
```

## Prisma Studio

Prisma provides a web interface to manage the database. To run it, run the following command:

```bash
yarn prisma studio
```

## Prisma Client

Prisma provides a client to access the database. To use it, import it in your code:

```typescript
import { PrismaClient } from '@prisma/client';
```

The entity models are available as types.

```typescript
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const users: User[] = await prisma.user.findMany();
```

The tables can be referenced as deletegates. This allows to use the `PrismaClient` as a context:

```typescript
import { Prisma } from '@prisma/client';

const userContext: Prisma.UserDelegate<false> = prisma.user;

const users: User[] = await userContext.findMany();
```
