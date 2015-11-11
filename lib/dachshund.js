const fs = require('fs');

module.exports = {
  dashize: dashize,
  underscorize: underscorize
};

function dashize(file, suppress) {
  find(file, (err, _) => {
    if (err) {
      if (!suppress) {
        console.error(err.message);
      }
      return;
    }

    const newPath = file.replace(/_/g, '-');
    if (file === newPath && !suppress) {
      console.error(`No need to change ${newPath}`);
    } else if (file !== newPath) {
      fs.rename(file, newPath, (err, _) => {
        console.log(`${file} => ${newPath}`);
      });
    }
  });
}

function underscorize(file, suppress) {
  find(file, (err, _) => {
    if (err) {
      if (!suppress) {
        console.error(err.message);
      }
      return;
    }

    const newPath = file.replace(/-/g, '_');
    if (file === newPath && !suppress) {
      console.error(`No need to change ${newPath}`);
    } else if (file !== newPath) {
      fs.rename(file, newPath, (err, _) => {
        console.log(`${file} => ${newPath}`);
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
      // Should never have to suppress this.
      console.error('Path does not exist.');
      return;
    }

    if (!stats.isFile() && !stats.isDirectory) {
      callback(new Error('Not a file or directory'));
    }

    callback(null, file);
  });
}
