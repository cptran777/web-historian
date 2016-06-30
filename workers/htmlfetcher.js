var archive = require('../helpers/archive-helpers');

exports.updateArchives = () => {
  archive.readListOfUrls(array => {
    // Loop through all URLs
    array.forEach(url => {
      // Check to see if URL is archived
      archive.isUrlArchived(`${archive.paths.archivedSites}/${url}.html`, exists => {
        if (!exists) {
          // If URL is not archived, download HTML file for URL.
          archive.downloadUrls(url);
        }
      });
    });
  });
};