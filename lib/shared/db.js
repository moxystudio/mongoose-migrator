'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const { Migration } = require('./models');

module.exports = {
    setup: async () => {
        await mongoose.connect(config.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        await Migration.createCollection();
    },
};
