'use strict';

const { setup, teardown, sleep } = require('./shared/test-helpers');
const { Migration } = require('./shared/models');
const down = require('./down');
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

    await up();
});

afterEach(teardown);

it('reverts only last migration if no options are passed', async () => {
    await down();
    await expect(Migration.countDocuments()).resolves.toEqual(2);

    const migratedVersions = (await Migration.find({}).select('version').lean().exec())
        .map(({ version }) => ({ version }))
        .sort();

    expect(migratedVersions).toEqual(versions.slice(0, 2));
});

it('reverts `count` number of migrations', async () => {
    await down({ count: 2 });
    await expect(Migration.countDocuments()).resolves.toEqual(1);

    const migratedVersions = (await Migration.find({}).select('version').lean().exec())
        .map(({ version }) => ({ version }))
        .sort();

    expect(migratedVersions).toEqual(versions.slice(0, 1));
});

it('reverts down to (including) `migration`', async () => {
    await down({ migration: versions[1].version });
    await expect(Migration.countDocuments()).resolves.toEqual(1);

    const migratedVersions = (await Migration.find({}).select('version').lean().exec())
        .map(({ version }) => ({ version }))
        .sort();

    expect(migratedVersions).toEqual(versions.slice(0, 1));
});

it('throws on non-existent migration', async () => {
    await expect(() => down({ migration: 'nope' }))
        .rejects.toMatchObject({ message: "Migration 'nope' not found." });
});
