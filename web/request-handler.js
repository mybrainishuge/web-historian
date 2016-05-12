var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!
var fileExts = {
  '.js': 'text/javascript',
  '.css': 'text/css'
};

var loadStaticResources = function(filePath, res, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': contentType});
    } else {
      res.writeHead(200, {'Content-Type': contentType});
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
      fs.appendFile( archive.paths.list, body.slice(4) + '\n', (err) => {
        console.log(err);
      });
      res.writeHead(302, {'Content-Type': contentType});
      res.end();
    });
  } 

  if (req.method === 'GET') {
    if (extName === '.com') {
      filePath = archive.paths.archivedSites + req.url;
      loadStaticResources(filePath, res, contentType);
    } else {
      if (filePath === '') {
        filePath = './web/public/index.html';
      } else {
        filePath = './web/public' + req.url;
      }
      loadStaticResources(filePath, res, contentType);
    }
  } 

};
