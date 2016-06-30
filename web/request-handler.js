var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders heres
var fs = require('fs');
var http = require('http');
var render = require('./http-helpers');
var mime = require('mime');
var url = require('url');
var parse = require('./parse'); // parse.URL

exports.handleRequest = (req, res) => {
  if (req.method === 'GET') {
    handleGet(req, res);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  }
  // res.end(archive.paths.list);
};

// Get local directory and render it
var handleGet = (request, response, inputUrl) => {
  var filename = inputUrl === undefined ? path.join(process.cwd(), '/web/public/index.html') : path.join(process.cwd(), `archives/sites/${inputUrl}.html`);
  render.serveAssets(response, filename);
};

var handlePost = (request, response) => {
  var inputUrl;

  // Retrieves URL and parses it
  request.on('data', data => { 
    inputUrl = parse.URL(data.toString().slice(4));
  });

  request.on('end', () => {
    fs.readFile('archives/sites.txt', 'utf8', (err, file) => {
      if (file.indexOf(inputUrl) > -1) {
        // if input URL exists in sites.txt, call handleGet to render it
        handleGet(request, response, inputUrl);
      } else {
        // if input URL doesn't exist, append URL to sites.txt
        fs.appendFile('archives/sites.txt', `${inputUrl}\n`, err => {
          if (err) {
            response.write(`${err} \n`);
          }

          // Re-render index.html
          handleGet(request, response);
        });
      }
    });

  });
};










