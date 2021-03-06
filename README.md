# UCLA Radio API

[![Travis CI](https://img.shields.io/travis/uclaradio/uclaradio-api/master.svg?style=flat)](https://travis-ci.org/uclaradio/uclaradio-api)
[![Codecov](https://img.shields.io/codecov/c/github/uclaradio/uclaradio-api.svg)](https://codecov.io/github/uclaradio/uclaradio-api)
[![Dependencies](https://david-dm.org/uclaradio/uclaradio-api/status.svg?style=flat)](https://david-dm.org/uclaradio/uclaradio-api)
[![Dev dependencies](https://david-dm.org/uclaradio/uclaradio-api/dev-status.svg?style=flat)](https://david-dm.org/uclaradio/uclaradio-api?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat)](https://github.com/facebook/jest)
[![license](https://img.shields.io/github/license/uclaradio/uclaradio-api.svg)](/LICENSE)

The API for UCLA Radio's website and mobile apps. It's powered by an Express
server with a PostgreSQL backend and a GraphQL endpoint.

## Technologies Used

TODO

## Services Used

TODO

## Structure

```
uclaradio-api/
├── LICENSE
├── README.md
├── bin
│   └── www
├── dist
│   ├── app.js
│   ├── app.js.map
│   ├── controllers
│   ├── errorHandling.js
│   ├── errorHandling.js.map
│   ├── models
│   └── routes
├── package.json
├── schema.graphql
├── src
│   ├── app.ts
│   ├── controllers
│   ├── errorHandling.ts
│   ├── models
│   └── routes
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

The UCLA Radio API follows an MVC pattern.

Models are defined in the `models` folder.

Controllers are stored in the `controllers` folder.

Note that test files are put in the same directory as the respective file they
test and have the extension `.test.ts`.

## Contributing

### Prerequisites

There are a couple of programs and files this project depends on that you'll
need to have installed to run it locally.

1. Node – You can install this with a simple `brew install node` on macOS.
2. [Yarn](https://yarnpkg.com/lang/en/docs/install/) – Yarn is a JavaScript
   package manager, and an alternative to npm. We prefer it to npm because it
   has a couple of nice features such as caching, lockfiles, and faster
   downloads.
3. [Visual Studio Code](https://code.visualstudio.com) – VS Code is an open
   source text editor built by Microsoft and has amazing tooling support for
   TypeScript projects (as well as a lot of other awesome features!). You can
   use any text editor you want, but VS Code will give you a nice experience :).
4. PostgreSQL – Postgres is the database we use. Installing it locally can be a
   little daunting, so check out our guide below if you're unfamiliar with it!
5. A `.env` file – It's [good practice](https://12factor.net/config) to store
   things like API keys and database information with environment variables so
   that they can easily be changed for different environments without code
   changes. This is cool, but when you have a lot of configuration variables it
   can become hard to manage, so we use a package called
   [dotenv](https://www.npmjs.com/package/dotenv) that reads configuration data
   from a file called `.env` and puts them into `process.env`. Check out our
   guide below for an example `.env`.

#### Installing PostgreSQL

##### Mac

You want to install Postgres through [Homebrew](https://brew.sh).

```shell
brew install postgres
```

Then start Postgres with the command:

```shell
brew services start postgresql
```

If you have any issues starting up Postgres, refer to this handy [StackOverflow post](https://stackoverflow.com/questions/13410686/postgres-could-not-connect-to-server).

Verify Postgres is working by accessing `psql`, an admin utility that is installed with Postgres:

```shell
psql postgres
```

For reference, you can stop postgres at any time with
`brew services stop postgresql`. You don't want to do that right now, though!

Instead, you'll want to create UCLA Radio's database. We call ours `uclaradio`.

```shell
createdb uclaradio
```

You'll also want to create a dummy database used for testing. It's called
`uclaradio-test`.

```shell
createdb uclaradio-test
```

Note that by default, the Postgres user is your computer's username (e.g., `nathan`) and there is
no password. When creating your `.env` file, the values will look something
like:

```
DATABASE_HOST=localhost
DATABASE_USER=nathan
DATABASE_PASSWORD=
...
(other values)
...
```

Dope.

For development, you may also find it useful to use a GUI client to visualize
the database. There
[a lot of great options](https://wiki.postgresql.org/wiki/Community_Guide_to_PostgreSQL_GUI_Tools),
but we recommend [PSequel](http://www.psequel.com)!

Run the following command to populate the `uclaradio` database with our tables and test data:

```
yarn setup
```

If the script hangs, press `CTRL+C` and run the above command again.

##### Windows

We're working on this! If you know how to install Postgres on Windows, please
make a pull request!

#### Example .env File

Please make an .env file with the following values:

```
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
```

## Database Objects

Users Shows Songs (Rivendell) Messages (Rivendell)
