#!/usr/bin/env node

'use strict';

const yargs = require('yargs');

// eslint-disable-next-line @babel/no-unused-expressions
yargs
    .scriptName('migrate')
    .wrap(Math.min(120, yargs.terminalWidth()))
    .alias('help', 'h')
    .alias('version', 'v')
    .strictCommands()
    .demandCommand(1, 'Please specify the command to run')
    .commandDir('./commands', {
        exclude: (path) => path.endsWith('.test.js'),
    })
    .argv;
