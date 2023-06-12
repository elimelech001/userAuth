## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Docker Compose Instructions

To build and run the application using Docker Compose, follow these steps:

1. Build the Docker image:
    ```
    docker-compose build
    ```

2. Once the image is built, start the application:
    ```
    docker-compose up
    ```

To stop the application, use the following command:
    ```
    docker-compose down
    ```

Please ensure Docker and Docker Compose are installed on your machine before running these commands.

## Environment Variables

This application uses environment variables for configuration. Create a `.env` file in the root of the project and add the following key-value pairs:

env and dockerenv
```
APP_SECRET=<your-jwt-secret-key>
EMAIL_HOST=<your-email-host>
EMAIL_PORT=<your-email-port>
EMAIL_SECURE=<true-or-false>
EMAIL_USER=<your-email-username>
EMAIL_PASSWORD=<your-email-password>
DB_TYPE=<your-db-type>
DB_HOST=<your-db-host>
DB_PORT=<your-db-port>
DB_USERNAME=<your-db-username>
DB_DATABASE=<your-db-database>
DB_PASSWORD=<your-db-password>
POSTGRES_USER=<your-postgres-user>
POSTGRES_PASSWORD=<your-postgres-password>
POSTGRES_DB=<your-postgres-db>
