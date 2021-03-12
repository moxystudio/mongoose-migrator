'use strict';

const fs = require('fs/promises');
const Migration = require('./shared/models/migration');
const config = require('./shared/config');
const db = require('./shared/db');
const logger = require('./shared/logger');

const up = async (opts) => {
    const root = process.cwd();

    opts = {
        dir: config.migrationsFolder,
        logger,
        ...opts,
    };

    const filenames = await fs.readdir(`${root}/${opts.dir}`);

    await db.setup();

    const migration = await Migration.findOne().sort({ version: -1 }).lean().exec();

    const migrationsToRun = migration ?
        filenames.filter((f) => f.split('-')[0] > migration?.version).sort() :
        filenames;

    for await (const filename of migrationsToRun) {
        const migration = require(`${root}/${opts.dir}/${filename}`);

        await migration.up();
        await Migration.create({ version: migration.version });

        opts.logger.info({}, `migrate up: ${filename}`);
    }

    opts.logger.info({}, 'migrate up: complete');
};

module.exports = up;
