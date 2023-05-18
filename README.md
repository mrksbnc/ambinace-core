# Ambiance core

Ambiance core is the main API service for the Ambiance project.

## Prerequisites

Ambiance core is built using Node.js and Express. To run the service, you will need to install the following:

- [Node.js, latest LTS](https://nodejs.org/en/)
- [PostgreSQL, latest version](https://www.postgresql.org/download/)
- [Redis, latest version](https://redis.io/download)
- [Yarn, latest version](https://yarnpkg.com/en/docs/install)

## Setup

To be able to start the API service, you will need to create a `.env` file in the root of the project. This file will contain the environment variables that the service will use. The
enviroment values are listed in the `.env.example` file.

To create the `.env` file, run the following command:

```bash
	cp .env.example .env
```

You will need to fill in the values in the `.env` file with the correct ones for your environment.

After this run the following command to init the project:

```bash
	yarn setup
```

This will install the project dependencies and run the database migrations.

## Running the service in development mode

To run the service in development mode, run the following commands:

```bash
  yarn dev
```

## Running the service in production mode

To run the service in production mode, run the following commands:

```bash
  yarn start
```

This will run the already built service.

## Building the service

```bash
  yarn build
```

## Running type checking

To run type checking, run the following commands:

```bash
  yarn type-check
```

## Running linting

To run linting, run the following commands:

```bash
  yarn lint
```
