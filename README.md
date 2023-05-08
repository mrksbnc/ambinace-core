# Ambiance core

Ambiance core is the backend service of the Ambiance project. It is responsible for the following tasks:

## Prerequisites

Ambiance core is built using Node.js and Express.js. To run the service, you will need to install the following:

- [Node.js, latest LTS](https://nodejs.org/en/)
- [PostgreSQL, latest version](https://www.postgresql.org/download/)
- [Redis, latest version](https://redis.io/download)
- [Yarn, latest version](https://yarnpkg.com/en/docs/install)
- [Docker, latest version](https://docs.docker.com/install/)
- [Docker Compose, latest version](https://docs.docker.com/compose/install/)

## Installation

To install the project dependencies, run the following commands:

```bash
  yarn install
```

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

## Running the service in a Docker container

To run the service in a Docker container, run the following commands:

```bash
  docker-compose up
```

## Running the service in a Docker container in production mode

To run the service in a Docker container in production mode, run the following commands:

```bash
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
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
