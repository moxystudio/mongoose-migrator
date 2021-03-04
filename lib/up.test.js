'use strict';

const { setup, teardown, sleep } = require('./shared/test-helpers');
const { Migration } = require('./shared/models');
const up = require('./up');
const create = require('./create');

let versions;

beforeEach(async () => {
    await setup();

    versions = [];
    versions.push(await create({ name: 'a' }));
    await sleep(10);
    versions.push(await create({ name: 'b' }));
    await sleep(10);
    versions.push(await create({ name: 'c' }));
});

afterEach(teardown);

it('runs all migrations if no migrations have been run yet, does not re-run migrations', async () => {
    await up();

    await expect(Migration.countDocuments()).resolves.toEqual(3);

    const migratedVersions = (await Migration.find({}).select('version').lean().exec())
        .map(({ version }) => ({ version }))
        .sort();

    expect(migratedVersions).toEqual(versions);

    await up();

    await expect(Migration.countDocuments()).resolves.toEqual(3);
});

it('only runs pending migrations', async () => {
    await up();
    await expect(Migration.countDocuments()).resolves.toEqual(3);

    const { version } = await create({ name: 'd' });

    await up();
    await expect(Migration.countDocuments()).resolves.toEqual(4);
    await expect(Migration.findOne({ version }).lean().exec()).resolves.toMatchObject({ version });
});
