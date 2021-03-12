'use strict';

const fs = require('fs/promises');
const Migration = require('./shared/models/migration');
const config = require('./shared/config');
const db = require('./shared/db');
const logger = require('./shared/logger');

const down = async (opts) => {
    const root = process.cwd();

    opts = {
        dir: config.migrationsFolder,
        logger,
        ...opts,
    };

    const filenames = await fs.readdir(`${root}/${opts.dir}`);

    await db.setup();

    let migrationsToRevert;

    if (!opts.count && !opts.migration) {
        migrationsToRevert = filenames.sort().reverse().slice(0, 1);
    } else if (opts.count && !opts.migration) {
        migrationsToRevert = filenames.sort().reverse().slice(0, Math.floor(opts.count));
    } else if (opts.migration) {
        const migration = filenames.find((f) => f.split('-')[0] === opts.migration);

        if (!migration) {
            throw new Error(`Migration '${opts.migration}' not found.`);
        }

        migrationsToRevert = filenames
            .filter((f) => f.split('-')[0] >= opts.migration)
            .sort()
            .reverse();
    }

    for await (const filename of migrationsToRevert) {
        const migration = require(`${root}/${opts.dir}/${filename}`);

        await migration.down();
        await Migration.deleteOne({ version: migration.version }).exec();

        opts.logger.info({}, `migrate down: ${filename}`);
    }

    opts.logger.info({}, 'migrate down: complete');
};

module.exports = down;
