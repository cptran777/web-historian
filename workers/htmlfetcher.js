var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;


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