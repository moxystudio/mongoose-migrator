'use strict';

exports.command = 'up';

exports.describe = 'Runs pending migrations, calling the `up` method for each one.';

exports.builder = (yargs) => (
    yargs
        .option('dir', {
            type: 'string',
            describe: 'Directory to read migration files from',
            default: 'migrations',
        })
);

exports.handler = async (argv) => {
    const up = require('../../up');
    const { dir } = argv;

    await up({ dir });
};
