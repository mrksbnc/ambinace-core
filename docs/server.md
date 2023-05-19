# Server

## Installation

See [setup](setup.md) for more information.

### Requirements

- [Node.js, latest LTS](https://nodejs.org/en/)
- [PostgreSQL, latest version](https://www.postgresql.org/download/)
- [Yarn, latest version](https://yarnpkg.com/en/docs/install)

### Scripts

The following scripts are available:

- `yarn dev`: Starts the server in development mode.
- `yarn start`: Starts the server in production mode.
- `yarn test`: Runs the tests.
- `yarn type-check`: Checks the types and import validatity.
- `yarn lint`: Runs eslint on the project files.
- `yarn lint:fix`: Runs eslint on the project files and fixes the errors.
- `yarn format`: Formats the project files with prettier.
- `yarn format:check`: Checks the project files with prettier.
- `yarn build`: Builds the project with the [build script](scripts/build.sh).
- `yarn setup`: Sets up the project with the [setup script](scripts/setup.sh).

## Project structure

The project is structured as follows:

- `src`: Contains the source code.

  - `api`: Contains the API related files.
    - `controllers`: Contains the controllers.
    - `middlewares`: Contains the middlewares.
    - `routes`: Contains the routes.
  - `config`: Contains the configuration files

  - `data`: Contains the constants and other application related data.

    - `models`: Contains the models.
    - `constants`: Contains the constants and enums.

  - `database`: Contains the database related files and the default instance

    - `repositories`: Contains the database repositories.
    - `migrations`: Contains the database migrations.

  - `errors`: Contains the error classes.
  - `server`: Contains the server related files.
  - `services`: Contains the services.
  - `tests`: Contains the tests.
  - `utils`: Contains the utility functions.
