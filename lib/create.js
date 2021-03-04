'use strict';

const fs = require('fs/promises');
const config = require('./shared/config');

const create = async (opts) => {
    const root = process.cwd();

    opts = {
        dir: config.migrationsFolder,
        ...opts,
    };

    if (!opts.name) {
        throw new Error('Migration name is required.');
    }

    const now = Date.now();

    const filename = `${root}/${opts.dir}/${now}-${opts.name}.js`;

    const file = `'use strict';

exports.version = '${now}';

exports.up = async () => {};

exports.down = async () => {};`;

    try {
        await fs.mkdir(`${root}/${opts.dir}`);
    } catch {} // eslint-disable-line no-empty

    try {
        await fs.writeFile(filename, file);

        // console.log(`Created ${filename}`);
    } catch (err) {
        console.error(err);
    }

    return { version: now.toString() };
};

module.exports = create;
