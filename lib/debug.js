'use strict';

const mongoose = require('mongoose');
const config = require('./shared/config');
const Migration = require('./shared/models/migration');

mongoose.set('bufferCommands', false);

module.exports = {
    dir: async () => ({
        processCWD: process.cwd(),
        processEnvINIT_CWD: process.env.INIT_CWD, // eslint-disable-line
        __dirname: __dirname, // eslint-disable-line
        pathResolveDot: require('path').resolve('.'),
    }),

    connect: async () => {
        await mongoose.connect(config.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('Connected to MongoDB from mongoose-migrator');
    },

    migrations: async () => {
        const createCollection = await Migration.createCollection();

        console.log({ createCollection });

        const migrations = await Migration.findAll({}).exec();

        console.log({ migrations });
    },
};
