'use strict';

exports.command = 'down [migration]';

exports.describe = `Runs migrations, starting at the latest, calling the 'down' method for each one.
 If [migration] is ommited, it reverts just the latest migration.`;

exports.builder = (yargs) => (
    yargs
        .positional('migration', {
            type: 'string',
            describe: 'What version to migrate down to',
        })
        .option('dir', {
            type: 'string',
            describe: 'Directory to read migration files from',
            default: 'migrations',
        })
        .option('count', {
            type: 'number',
            describe: 'How many migrations to revert. Is ignored if [migration] is provided.',
        })
);

exports.handler = async (argv) => {
    const down = require('../../down');
    const { migration, dir, count } = argv;

    await down({ migration, dir, count });
};
