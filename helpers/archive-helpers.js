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

exports.readListOfUrls = function(list) {
  var listStr = '';
  fs.readFile(exports.paths.list, (err, data) => {
    // list.push( '' + data );
    listStr += data;
    
    var newArr = listStr.split('\n');
    for (var i = 0; i < newArr.length; i++ ) {
      if (newArr[i] === '') { continue; }
      list.push(newArr[i]);
    }

  });

}; 


exports.isUrlInList = function(url, list) {
  return list.indexOf(url) !== -1; 
};

exports.addUrlToList = function(url, list) {
  list.push(url);
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
