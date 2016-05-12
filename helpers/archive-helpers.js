var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    var newArr = ('' + data).split('\n');
    callback(newArr); 
  });
}; 


exports.isUrlInList = function(url, callback) {
  var is = false;
  exports.readListOfUrls( array => {
    if (array.indexOf(url) !== -1) {
      is = true;
    }
    callback(is);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile( exports.paths.list, url + '\n', (err) => {
    console.log(err);
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  var is = false;

  fs.stat(`${exports.paths.archivedSites}/${url}`, function(err, stat) {
    if (err == null) {
      // console.log('File exists');
      is = true;
    } else if (err.code === 'ENOENT') {
    } else {
      console.log('switched ' + is + ' to true');
      console.log('Error: ', err.code);
    }
    callback(is);
  });

};

exports.downloadUrls = function(array) {
  array.forEach(site => {
    if (site !== '' && site.slice(0, 4) === 'www.') { 

      var options = {
        host: site
      };
      var callback = function(response) {
        var str = '';
        response.on ('data', function(chunk) {
          str += chunk;
        });
        response.on('end', function() {
          fs.writeFile(exports.paths.archivedSites + '/' + site, str);
          // console.log('site:', str);
        });
      };
      http.request(options, callback).end();
    }
  });

};
