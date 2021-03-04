'use strict';

const rimraf = require('rimraf');

module.exports = async () => {
    await global.__REPL_SET__.stop();

    rimraf.sync(global.__TMP_FOLDER__);
    rimraf.sync('tmp-test');
};
