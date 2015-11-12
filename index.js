'use strict';

const program = require('commander');
const dachshund = require('./lib/dachshund');

module.exports = {
  underToDash: underToDash,
  dashToUnder: dashToUnder
};

function underToDash(args) {
  program.parse(args);

  if (program.args.length === 0) {
    console.error('A path is required');
    return;
  }

  program.args.forEach(dashize);
}

function dashToUnder(args) {
  program.parse(args);

  if (program.args.length === 0) {
    console.error('A path is required');
    return;
  }

  program.args.forEach(underscorize);
}

function dashize(path) {
  dachshund.dashize(path, (err, newPath) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`# ${path} => ${newPath}`);
    }
  });
}

function underscorize(path) {
  dachshund.underscorize(path, (err, newPath) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`# ${path} => ${newPath}`);
    }
  });
}

if (require.main === module) {
  underToDash(process.argv);
}
