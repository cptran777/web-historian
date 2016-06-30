var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var getHtml = require('request');

/*****************************************************************************************
  You will need to reuse the same paths many times over in the course of this sprint.
  Consider using the 'paths' object below to store frequently used file paths. This way,
  if you move any files, you'll only need to change your code in one place! Feel free to
  customize it in any way you wish.
*****************************************************************************************/

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = (pathsObj) => {
  _.each(pathsObj, (path, type) => {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = (callback) => {
  fs.readFile(exports.paths.list, 'utf8', (err, file) => {
    if (err) {
      console.log(`${err}\n`);
    } else {
      callback(file.split('\n'));
    }
  });
};

// Check list to see if URL is in the list
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(array) {
    if (array.indexOf(url) !== -1) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

// Add URL to list and invokes callback.
exports.addUrlToList = function(url, callback) {
  // Appends URL to sites.txt.
  fs.appendFile(exports.paths.list, `${url}\n`, err => {
    if (err) { response.write(`${err} \n`); }
  });

  // Invoke callback if it exists
  if (callback !== undefined) {
    callback();
  }
};

// Checks to see if the URL page is archived.
exports.isUrlArchived = function(path, callback) {
  fs.exists(path, exist => (exist) ? callback(true) : callback(false));
};

exports.downloadUrls = function(website) {
  getHtml(`http://${website}`, function(error, response, body) {
    fs.writeFile(`${exports.paths.archivedSites}/${website}.html`, body, function(error) {
      if (error) {
        console.log(`${error}\n`);
      }
    });
  });
};
