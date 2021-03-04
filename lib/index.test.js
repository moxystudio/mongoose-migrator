'use strict';

it('exports correct modules', () => {
    const api = require('.');

    expect(api).toMatchObject({
        create: require('./create'),
        up: require('./up'),
        down: require('./down'),
    });
});
