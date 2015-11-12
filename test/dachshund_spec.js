'use strict';

const expect = require('expect');
const dachshund = require('../lib/dachshund');
const path = require('path');

const helpers = require('./helpers');

describe('dachshund', () => {
  let filePath = '';

  beforeEach(done => {
    helpers.createTestFiles().then(testPath => {
      filePath = testPath;
      done();
    });
  });

  describe('dashize', () => {
    const dashize = dachshund.dashize;
    it('has a function called dashize', () => {
      expect(dashize).toBeA('function');
    });

    it('changes a file with underscores to dashes', done => {
      dashize(path.join(filePath, 'underscored_file.txt'), (_, newPath) => {
        expect(newPath).toEqual(path.join(filePath, 'underscored-file.txt'));
        done();
      });
    });

    it('changes a directory with underscores to dashes', done => {
      dashize(path.join(filePath, 'underscored_dir'), (_, newPath) => {
        expect(newPath).toEqual(path.join(filePath, 'underscored-dir'));
        done();
      });
    });

    it('changes the file in a underscored directory, but not the directory', done => {
      const dir = path.join(filePath, 'underscored_dir');

      dashize(path.join(dir, 'underscored_file.txt'), (_, newPath) => {
        expect(newPath).toEqual(path.join(dir, 'underscored-file.txt'));
        done();
      });
    });

    it('returns an error if the file does not need to be changed', done => {
      const dashedPath = path.join(filePath, 'dashed-file.txt');

      dashize(dashedPath, err => {
        expect(err.message).toMatch(new RegExp(dashedPath));
        done();
      });
    });
  });

  describe('underscorize', () => {
    const underscorize = dachshund.underscorize;

    it('has a function called underscorize', () => {
      expect(underscorize).toBeA('function');
    });

    it('changes a file with dashes to underscores', done => {
      underscorize(path.join(filePath, 'dashed-file.txt'), (_, newPath) => {
        expect(newPath).toEqual(path.join(filePath, 'dashed_file.txt'));
        done();
      });
    });

    it('changes a directory with dashes to underscores', done => {
      underscorize(path.join(filePath, 'dashed-dir'), (_, newPath) => {
        expect(newPath).toEqual(path.join(filePath, 'dashed_dir'));
        done();
      });
    });

    it('changes the file in a dashed directory, but not the directory', done => {
      const dir = path.join(filePath, 'dashed-dir');

      underscorize(path.join(dir, 'dashed-file.txt'), (_, newPath) => {
        expect(newPath).toEqual(path.join(dir, 'dashed_file.txt'));
        done();
      });
    });

    it('returns an error if the file does not need to be changed', done => {
      const underscoredPath = path.join(filePath, 'underscored_file.txt');

      underscorize(underscoredPath, err => {
        expect(err.message).toMatch(new RegExp(underscoredPath));
        done();
      });
    });
  });

  afterEach(done => {
    helpers.destroyTestFiles().then(done);
  });
});
