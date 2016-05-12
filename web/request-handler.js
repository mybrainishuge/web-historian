var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!
var fileExts = {
  '.js': 'text/javascript',
  '.css': 'text/css'
};

var loadStaticResources = function(filePath, res, contentType, code) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': contentType});
    } else {
      res.writeHead(code, {'Content-Type': contentType});
      res.write(data);
    }
    res.end();
  });
};


exports.handleRequest = function (req, res) {
  var filePath = req.url.slice(1);
  var extName = path.extname(filePath);
  var contentType = fileExts[extName] || 'text/html';
  
  if (req.method === 'POST') {
    var body = '';
    req.on('data', data => {
      body += data;
    });
    req.on('end', () => {
      var url = body.slice(4);
      // check if url is archived
      archive.isUrlArchived(url, (isArchived) => {
        console.log('Is ' + url + ' archived?', isArchived);
        // if url is not archived
        if (!isArchived) {
          //TODO: show user loading.html
          loadStaticResources(archive.paths.siteAssets + '/loading.html', res, contentType, 302);
          // check if url is in todo list
          archive.isUrlInList(url, (exists) => {
            // if not in list
            if (!exists) {
              // add to todo list
              archive.addUrlToList(url, () => {
                console.log(url + ' has been added to list.');
              });
            }
          });
        } else {
        //if it is archived, feed it to the user
          loadStaticResources(archive.paths.archivedSites + '/' + url, res, contentType, 302);
        }
      });


      // res.writeHead(302, {'Content-Type': contentType});
      // res.end();
    });
  } 

  if (req.method === 'GET') {
    if (extName === '.com') {
      filePath = archive.paths.archivedSites + req.url;
      loadStaticResources(filePath, res, contentType, 200);
    } else {
      if (filePath === '') {
        filePath = './web/public/index.html';
      } else {
        filePath = './web/public' + req.url;
      }
      loadStaticResources(filePath, res, contentType, 200);
    }
    // res.end();
  } 

};
