var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var http = require('http');
var mime = require('mime');
var url = require('url');

exports.handleRequest = (req, res) => {
  if (req.method === 'GET') {
    handleGet(req, res);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  }

  // res.end(archive.paths.list);
};

// Re-renders the index.html page.
var init = (request, response) => {
  var requestUrl = url.parse(request.url).pathname; // directory in root folder
  var filename = path.join(process.cwd(), requestUrl); // domain name + directory (ex: /web/public/index.html)

  if (fs.statSync(filename).isDirectory()) {
    filename = filename + 'web/public/index.html'; // ip/web/public/index.html
  }

  fs.readFile(filename, 'binary', function(err, file) {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(`${err} \n`);
      response.end();
    } else {
    // Load file into response
      response.writeHead(302, {'Content-Type': mime.lookup(filename)});
      response.write(file, 'binary');
      response.end();
    }
  });
};

// get local directory and render it
var handleGet = (request, response) => {
  var requestUrl = url.parse(request.url).pathname; // directory in root folder
  var filename = path.join(process.cwd(), requestUrl); // domain name + directory (ex: /web/public/index.html)

  fs.exists(filename, exists => {
    // if directory doesn't exist, return error 404  
    if (!exists) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404: Not found!');
      response.end();
    } else {
      // checks to see if directory is a folder
      if (fs.statSync(filename).isDirectory()) {
        filename = filename + 'web/public/index.html'; // ip/web/public/index.html
      }

      fs.readFile(filename, 'binary', function(err, file) {
        // return error 500 if there are errors reading file
        if (err) {
          response.writeHead(500, {'Content-Type': 'text/plain'});
          response.write(`${err} \n`);
          response.end();
        } else {
        // load file into response
          response.writeHead(200, {'Content-Type': mime.lookup(filename)});
          response.write(file, 'binary');
          response.end();
        }
      });
    }
  });
};

var handlePost = (request, response) => {
  var inputUrl;

  // retrieves URL from form
  request.on('data', data => {
    inputUrl = data.toString().slice(4);
  });

  request.on('end', () => {
    fs.appendFile('archives/sites.txt', `${inputUrl}\n`, function(err) {
    // fs.appendFile('test/testdata/sites.txt', `${inputUrl}\n`, function(err) {
      if (err) {
        response.write(`${err} \n`);
      }

      init(request, response);
    });
  });
  
};













