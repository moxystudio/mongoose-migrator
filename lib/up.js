'use strict';

const fs = require('fs/promises');
const Migration = require('./shared/models/migration');
const config = require('./shared/config');

const up = async (opts) => {
    const root = process.cwd();

    opts = {
        dir: config.migrationsFolder,
        ...opts,
    };

    await Migration.createCollection();

    const filenames = await fs.readdir(`${root}/${opts.dir}`);
    const migration = await Migration.findOne().sort({ version: -1 }).lean().exec();

    const migrationsToRun = migration ?
        filenames.filter((f) => f.split('-')[0] > migration?.version).sort() :
        filenames;

    for await (const filename of migrationsToRun) {
        const { version, up } = require(`${root}/${opts.dir}/${filename}`);

        await up();
        await Migration.create({ version });

        // console.log(`migrate up: ${filename}`);
    }

    // console.log('migrate up: complete');
};

module.exports = up;
