'use strict';

const { compose, baseConfig } = require('@moxy/jest-config-base');

module.exports = compose(
    baseConfig('@moxy/jest-config-base/environments/node-single-context'),
    (config) => {
        config.globalSetup = './jest.global-setup.js';
        config.globalTeardown = './jest.global-teardown.js';
        config.collectCoverage = true;
        config.collectCoverageFrom = [
            'lib/**/*.js',
            '!lib/cli/**/*.js',
        ];

        return config;
    },
);

