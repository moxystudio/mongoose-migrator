'use strict';

const fs = require('fs/promises');
const rimraf = require('rimraf');
const { setup, teardown, sleep } = require('./shared/test-helpers');
const config = require('./shared/config');
const create = require('./create');

beforeEach(setup);
afterEach(teardown);

it('creates files and folder', async () => {
    await create({ name: 'test-migration' });
    await sleep(10);
    await create({ name: 'fix-issue' });
    await sleep(10);
    await create({ name: 'fix-new-issue' });

    const filenames = await fs.readdir(config.migrationsFolder);

    filenames.sort();

    expect(filenames).toHaveLength(3);
    expect(filenames[0]).toMatch(/\d+-test-migration.js/);
    expect(filenames[1]).toMatch(/\d+-fix-issue.js/);
    expect(filenames[2]).toMatch(/\d+-fix-new-issue.js/);
});

it('overrides migrations folder', async () => {
    await fs.mkdir(config.migrationsFolder);

    await create({ dir: 'tmp-test', name: 'test-migration' });
    await sleep(10);
    await create({ dir: 'tmp-test', name: 'fix-issue' });
    await sleep(10);
    await create({ dir: 'tmp-test', name: 'fix-new-issue' });

    const defaultFolderFilenames = await fs.readdir(config.migrationsFolder);

    expect(defaultFolderFilenames).toHaveLength(0);

    const filenames = await fs.readdir('tmp-test');

    filenames.sort();

    expect(filenames).toHaveLength(3);
    expect(filenames[0]).toMatch(/\d+-test-migration.js/);
    expect(filenames[1]).toMatch(/\d+-fix-issue.js/);
    expect(filenames[2]).toMatch(/\d+-fix-new-issue.js/);

    rimraf.sync('tmp-test');
});

it('throws error if name is not specified', async () => {
    await expect(() => create({}))
        .rejects.toMatchObject({ message: 'Migration name is required.' });
});
