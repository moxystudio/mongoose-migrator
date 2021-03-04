mongoose-migrator
===

Mongodb database migrations for applications using [mongoose](https://mongoosejs.com/).

Provides a CLI for creating and running migrations.

Manages migrations using a `_migrations` collection in whatever database it is connected to.

Each migration has a `version` number, it being the unix timestamp (with miliseconds) at the time of its creation, and a `name`, which helps developers to describe a migration; this `name` serves no other purpose, so while you may have migrations with the same name, this is strongly discouraged.

Installation
--

```sh
$ npm i -S @moxy/mongoose-migrator
```

Command line usage
--

Add to your scripts in `package.json`:

```js
"scripts": {
    "migrate": "migrate"
}
```

```sh
$ npm run migrate -- --help

migrate <command>

Commands:
  migrate create <name>     Creates a new migration.
  migrate down [migration]  Runs migrations, starting at the latest, calling the 'down' method for each one.
                            If [migration] is ommited, it reverts just the latest migration.
  migrate up                Runs pending migrations, calling the `up` method for each one.

Options:
  -h, --help     Show help                                                                         [boolean]
  -v, --version  Show version number                                                               [boolean]
```

Writing a migration
---

After creating a migration, a file will be created with 3 exports:

- `version`: a `string`, representing the migration identifier; do not change this value.
- `up`: an `async function` that will be called when migrating up.
- `down`: as `async function` that will be called when migrating down; if a migration is supposed to not be reversible, you must `throw` an error in this function.

Node usage
--

You may also manage your migrations programatically. This allows finer grained control over when to migrate `up` or `down`. This approach still relies on having migrations saved to / read from a folder.

API
---

### create(options)

#### options

Type: `object`

##### options.name

Type: `string`

The name of the migration. Required.

##### options.dir

Type: `string`   
Default: `migrations`   
Environment variable: `process.env.MIGRATIONS_FOLDER`

The folder to the create the migration file in.

### up(options?)

#### options?

Type: `object`

##### options.dir

Type: `string`   
Default: `migrations`   
Environment variable: `process.env.MIGRATIONS_FOLDER`

The folder to the read the migration files from.

### down(options?)

#### options?

Type: `object`

##### options.count

Type: `int`

The number of migrations to revert.

##### options.migration

Type: `string`

The migration version to revert to, inclusive. Overrides options.count, if both are set.

##### options.dir

Type: `string`   
Default: `migrations`   
Environment variable: `process.env.MIGRATIONS_FOLDER`

The folder to the read the migration files from.
