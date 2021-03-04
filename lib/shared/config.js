'use strict';

const env = require('env-var');

module.exports = {
    mongo: {
        url: env
            .get('MONGO_URL')
            .asString(),
    },
    postgres: {
        url: env
            .get('POSTGRES_URL')
            .asString(),
    },
    migrationsFolder: env
        .get('MIGRATIONS_FOLDER')
        .default('migrations')
        .asString(),
};
