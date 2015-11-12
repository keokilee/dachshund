'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
Promise.promisifyAll(fs);

module.exports = {
  dashize: dashize,
  underscorize: underscorize
};

function findNewPath(filePath, regexp, replacement) {
  let components = filePath.split(path.sep);
  let file = components[components.length - 1];
  file = file.replace(regexp, replacement);

  components = components.slice(0, components.length - 1);
  components.push(file);
  return components.join(path.sep);
}

function dashize(file, callback) {
  find(file, err => {
    if (err) {
      callback(err);
      return;
    }

    const newPath = findNewPath(file, /_/g, '-');
    if (file === newPath) {
      callback(new Error(`No need to change ${newPath}`));
    } else if (file !== newPath) {
      fs.rename(file, newPath, (err, _) => {
        if (err) {
          callback(err);
        } else {
          callback(null, newPath);
        }
      });
    }
  });
}

function underscorize(file, callback) {
  find(file, err => {
    if (err) {
      callback(err);
      return;
    }

    const newPath = findNewPath(file, /-/g, '_');
    if (file === newPath) {
      callback(new Error(`No need to change ${newPath}`));
    } else if (file !== newPath) {
      fs.rename(file, newPath, (err, _) => {
        if (err) {
          callback(err);
        } else {
          callback(null, newPath);
        }
      });
    }
  });
}

/**
 * Helper function for determining if a file exists.
 * @param  {string}   file     The path of the file
 * @param  {Function} callback Callback to call on success or error
 */
function find(file, callback) {
  fs.stat(file, (err, stats) => {
    if (err) {
      callback(err);
    } else if (!stats.isFile() && !stats.isDirectory()) {
      callback(new Error('Not a file or directory'));
    } else {
      callback(null, file);
    }
  });
}
