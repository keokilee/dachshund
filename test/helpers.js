'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const rimrafAsync = Promise.promisify(require('rimraf'));
const touchAsync = Promise.promisifyAll(require('touch'));
const mkdirpAsync = Promise.promisify(require('mkdirp'));

const TMP_DIR = 'tmp';

module.exports = {
  createTestFiles,
  destroyTestFiles
};

const mkdir = fs.mkdirAsync;

function createTestFiles() {
  // Create testDirectory.
  const testDir = path.join(TMP_DIR, `tests`, `${new Date().getTime()}`);
  const testPath = path.join.bind(null, testDir);

  return mkdirpAsync(testDir).then(() => {
    // Let's make some files.
    const contents = [
      touchAsync(testPath('dashed-file.txt'), {force: true}),
      touchAsync(testPath('underscored_file.txt'), {force: true}),
      mkdir(testPath('dashed-dir')),
      mkdir(testPath('underscored_dir'))
    ];

    return Promise.all(contents).then(() => {
      const dirFiles = [
        touchAsync(testPath('dashed-dir', 'dashed-file.txt')),
        touchAsync(testPath('underscored_dir', 'underscored_file.txt'))
      ];

      return Promise.all(dirFiles).then(() => testDir);
    });
  });
};

function destroyTestFiles() {
  return rimrafAsync(path.join(TMP_DIR, `tests`));
}
