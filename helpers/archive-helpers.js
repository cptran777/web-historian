var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.isUrlInList = function() {
  // check list to see if URL is in the list
  exports.readListOfUrls();
};

exports.addUrlToList = function() {
  // if URL is not in list, add URL to list
  exports.isUrlInList();
};

exports.isUrlArchived = function() {
  
};

exports.downloadUrls = function() {

};
