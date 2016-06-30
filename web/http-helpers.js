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

exports.serveAssets = function(response, asset, callback) {
  /*************************************************************************
    Write some code here that helps serve up your static files!
    (Static files are things like html (yours or archived from others...),
    css, or anything that doesn't change often.)
  *************************************************************************/
  fs.exists(asset, exists => {
    // if directory doesn't exist, return error 404  
    if (!exists) {
      // RENDER LOADING PAGE
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404: Not found!');
      response.end();
    } else {
      fs.readFile(asset, 'binary', function(err, file) {
        // return error 500 if there are errors reading file
        if (err) {
          response.writeHead(500, {'Content-Type': 'text/plain'});
          response.write(`${err} \n`);
          response.end();
        } else {
        // load file into response
          response.writeHead(200, {'Content-Type': mime.lookup(asset)});
          response.write(file, 'binary');
          response.end();
        }
      });
    }
  });
};

  /*************************************************************************
    Write some code here that helps serve up your static files!
    (Static files are things like html (yours or archived from others...),
    css, or anything that doesn't change often.)
  *************************************************************************/

// As you progress, keep thinking about what helper functions you can put here!
