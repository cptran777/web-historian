var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var render = require('./http-helpers');
var url = require('url');
var parse = require('./parse');

exports.handleRequest = (req, res) => {
  if (req.method === 'GET') {
    handleGet(req, res);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  }
};

// Get local directory and render it
var handleGet = (request, response, inputUrl) => {
  var filename = inputUrl === undefined ? 
    `${archive.paths.siteAssets}/index.html` : 
    `${archive.paths.archivedSites}/${inputUrl}.html`;

  render.serveAssets(response, filename);
};

// Gets URL from user and renders if archived or appends to sites.txt if not archived
var handlePost = (request, response) => {
  var inputUrl;

  // Retrieves URL and parses it
  request.on('data', data => inputUrl = parse.URL(data.toString().slice(4)));

  request.on('end', () => {

    archive.readListOfUrls(function() {
      archive.isUrlInList(inputUrl, function(exists) {
        if (exists) {
          handleGet(request, response, inputUrl);
        } else {
          archive.addUrlToList(inputUrl, function() {
            handleGet(request, response);
          });
        }
      });
    });

    // fs.readFile(archive.paths.list, 'utf8', (err, file) => { // ReadListofUrls
    //   if (file.indexOf(inputUrl) > -1) { // callback -> isUrlInList
    //     // If input URL exists in sites.txt, call handleGet to render it
    //     handleGet(request, response, inputUrl); // <-- callback to isUrlInList
    //   } else {
    //     // If input URL doesn't exist, append URL to sites.txt
    //     fs.appendFile(archive.paths.list, `${inputUrl}\n`, err => { // <-- addUrlToList callbackto isurlinlist
    //       if (err) { response.write(`${err} \n`); } // <-- callback to AddUrlToList

    //       // Re-render index.html
    //       handleGet(request, response); // <-- get deleted
    //     });
    //   }
    // });

  });
};










