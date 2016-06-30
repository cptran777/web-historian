var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var render = require('./http-helpers');
var url = require('url');
var parse = require('./parse');

exports.handleRequest = (request, response) => {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  }
};

// Render index or specific URL's page
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
    // Search through URLs in sites.txt
    archive.readListOfUrls(function() {
      archive.isUrlInList(inputUrl, function(exists) {
        if (exists) {
          // If URL exists, pass URL to handleGet to render
          handleGet(request, response, inputUrl);
        } else {
          archive.addUrlToList(inputUrl, function() {
            // If URL doesn't exist, call handleGet w/o URL to render index
            handleGet(request, response);
          });
        }
      });
    });
  });
};










