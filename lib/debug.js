'use strict';

const mongoose = require('mongoose');
const Migration = require('./shared/models/migration');

mongoose.set('bufferCommands', false);

/* eslint-disable */
module.exports = {
    dir: async () => ({
        processCWD: process.cwd(),
        processEnvINIT_CWD: process.env.INIT_CWD,
        __dirname: __dirname,
        pathResolveDot: require('path').resolve('.'),
    }),

    connect: async () => {
        await mongoose.connect(config.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        logger.info('Connected to MongoDB from mongoose-migrator');
    },

    migrations: async () => {
        const createCollection = await Migration.createCollection();

        console.log({ createCollection });

        const migrations = await Migration.findAll({}).exec();

        console.log({ migrations });
    },
};

/* eslint-enable */
