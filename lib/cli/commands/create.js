'use strict';

exports.command = 'create <name>';

exports.describe = 'Creates a new migration.';

exports.builder = (yargs) => (
    yargs
        .positional('name', {
            type: 'string',
            describe: 'Migration name.',
        })
        .option('dir', {
            type: 'string',
            describe: 'Directory to read migration files from',
            default: 'migrations',
        })
);

exports.handler = async (argv) => {
    const create = require('../../create');
    const { name, dir } = argv;

    await create({ name, dir });
};
