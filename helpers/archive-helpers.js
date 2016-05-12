var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
      console.log('File exists');
    } else if (err.code === 'ENOENT') {
      is = true;
    } else {
      console.log('Some other error: ', err.code);
    }
    callback(is);
  });

};

exports.downloadUrls = function(array) {
  array.forEach(site => 
    fs.writeFile(exports.paths.archivedSites + '/' + site, 'blah blah blah')
  );
  
};
