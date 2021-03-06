var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var htmlFetcher = require('../workers/htmlfetcher');
var CronJob = require('cron').CronJob;

new CronJob('10 * * * * *', function() {
  htmlFetcher.updateArchives();
}, null, true, 'America/Los_Angeles');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}