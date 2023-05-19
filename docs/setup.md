# Setup

## Requirements

- [Node.js, latest LTS](https://nodejs.org/en/)
- [PostgreSQL, latest version](https://www.postgresql.org/download/)
- [Yarn, latest version](https://yarnpkg.com/en/docs/install)

## Setup

To be able to start the API service, you will need to create a `.env` file in the root of the project. This file will contain the environment variables that the service will use.

The enviroment values are listed in the `.env.example` file.

To create the `.env` file, run the following command:

```bash
cp .env.example .env
```

You will need to fill in the values in the `.env` file with the correct ones for your environment.

After this run the following command to init the project:

```bash
yarn setup
```

This will install the project dependencies, create the database and run the init migration.
