var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var mime = require('mime');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

var renderFile = (filepath, response) => {
  fs.readFile(filepath, 'binary', function(err, file) {
    // Return error 500 if there are errors reading file
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(`${err} \n`);
      response.end();
    } else {
    // Load file into response, which renders it
      response.writeHead(200, {'Content-Type': mime.lookup(filepath)});
      response.write(file, 'binary');
      response.end();
    }
  });
};

exports.serveAssets = (response, path, callback) => {
  
  /*************************************************************************
    Write some code here that helps serve up your static files!
    (Static files are things like html (yours or archived from others...),
    css, or anything that doesn't change often.)
  *************************************************************************/
  
  archive.isUrlArchived(path, function(exists) {
    if (exists) {
      // If HTML file exists for request, render to page.
      renderFile(path, response);
    } else {
      // If HTML file doesn't exist, render loading page.
      renderFile(`${archive.paths.siteAssets}/loading.html`, response);
    }
  });
};