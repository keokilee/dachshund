'use strict';

const expect = require('expect');
const dachshund = require('../lib/dachshund');

const helpers = require('./helpers');

describe('dachshund', () => {
  let path = '';

  before(done => {
    helpers.createTestFiles().then(testPath => {
      path = testPath;
      done();
    });
  });

  describe('dashize', () => {
    const dashize = dachshund.dashize;
    it('has a function called dashize', () => {
      expect(dashize).toBeA('function');
    });
  });

  describe('underscorize', () => {
    const underscorize = dachshund.underscorize;

    it('has a function called underscorize', () => {
      expect(underscorize).toBeA('function');
    });
  });

  after(done => {
    helpers.destroyTestFiles().then(done);
  });
});
