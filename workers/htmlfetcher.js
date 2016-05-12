// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var cron = require('cron');

// var processList = function() {


exports.worker = new cron.CronJob('* * * * *', function() {
  archive.readListOfUrls( function(list) {
    console.log('list', list);
    archive.downloadUrls(list);
  });
  console.log('Function executed');
}, null, true);



// };
// processList();
//download all urls in list

//