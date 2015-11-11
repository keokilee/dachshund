'use strict';

const fs = require('fs');
const program = require('commander');

function dashize(file, suppress) {
  fs.stat(file, (err, stats) => {
    if (err) {
      if (!suppress) {
        console.error('Path does not exist.');
      }

      return;
    }

    if (stats.isFile() || stats.isDirectory()) {
      const newPath = file.replace('_', '-');
      if (file === newPath && !suppress) {
        console.err(`No need to change ${newPath}`);
      } else {
        fs.rename(file, newPath, (err, _) => {
          console.log(`${file} => ${newPath}`);
        });
      }
    }
  });
}

function underscorize(file, suppress) {
  fs.stat(file, (err, stats) => {
    if (err) {
      if (!suppress) {
        console.error("Path '${file}' does not exist.");
      }
      return;
    }

    if (stats.isFile() || stats.isDirectory()) {
      const newPath = file.replace('-', '_');
      if (file !== newPath) {
        fs.rename(file, newPath, (err, _) => {
          console.log(`${file} => ${newPath}`);
        });
      }
    }
  });
}

function main() {
  program.parse(process.argv);
  let args = program.args;

  if (args.length === 0) {
    console.error('A path is required');
    return;
  }

  args.forEach(dashize);
}

if (require.main === module) {
  main();
}
