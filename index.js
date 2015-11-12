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

  program.args.forEach(dachshund.dashize);
}

function dashToUnder(args) {
  program.parse(args);

  if (program.args.length === 0) {
    console.error('A path is required');
    return;
  }

  program.args.forEach(dachshund.underscorize);
}

function dashize(path) {
  daschund.dashize(path, (err, newPath) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`# ${path} => ${newPath}`);
    }
  });
}

function underscorize(path) {
  daschund.underscorize(path, (err, newPath) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`# ${path} => ${newPath}`);
    }
  });
}

if (require.main === module) {
  dashToUnder(process.argv);
}
