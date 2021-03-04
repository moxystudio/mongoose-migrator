'use strict';

const fs = require('fs/promises');
const { MongoMemoryReplSet } = require('mongodb-memory-server');

module.exports = async () => {
    const tmpFolder = `tmp-${Math.random().toString().substring(2)}`;

    await fs.mkdir(tmpFolder);

    global.__TMP_FOLDER__ = tmpFolder;
    process.env.MIGRATIONS_FOLDER = tmpFolder;

    const replSet = new MongoMemoryReplSet({
        replSet: {
            count: 2,
            storageEngine: 'wiredTiger',
        },
    });

    await replSet.waitUntilRunning();

    const uri = await replSet.getUri();

    global.__REPL_SET__ = replSet;
    process.env.MONGO_URL = uri;
};

