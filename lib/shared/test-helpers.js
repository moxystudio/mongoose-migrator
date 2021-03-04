'use strict';

const mongoose = require('mongoose');
const rimraf = require('rimraf');
const Migration = require('./models/migration');
const config = require('./config');

module.exports = {
    sleep: async (miliseconds) => new Promise((resolve) => setTimeout(resolve, miliseconds)),

    setup: async () => {
        await mongoose.connect(config.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        await Migration.createCollection();
    },

    teardown: async () => {
        await Migration.deleteMany();

        rimraf.sync(config.migrationsFolder);
    },
};
