var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var sitesList = [];
// require more modules/folders here!
var sitesListLoaded = false;
var fileExts = {
  '.js': 'text/javascript',
  '.css': 'text/css'
};

var loadStaticResources = function(req, res) {
  var filePath = req.url.slice(1);
  var extName = path.extname(filePath);
  var contentType = fileExts[extName] || 'text/html';
  
  if (extName === '.com') {
    // TODO:  slice off www. ?
    //if filePath in sitesList, do something, 
    //else do something else
    if ( archive.isUrlInList(filePath, sitesList) ) {
      console.log('the file is there', filePath);
    } else {
      console.log('the file is NOT there', filePath);
    }
    console.log('filePath:', filePath);
    console.log('read sites', sitesList);
  }
  //
  if (filePath === '') {
    filePath = './web/public/index.html';
  } else {
    filePath = './web/public' + req.url;
  }
  

  console.log('req.url', req.url);
  console.log('File path', filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': contentType});
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
    }

    // res.end(archive.paths.list);
    // console.log('data',data);
    res.end();
  } );
  
};


exports.handleRequest = function (req, res) {
  if (!sitesListLoaded) {
    archive.readListOfUrls(sitesList);
    sitesListLoaded = true;
  }

  loadStaticResources(req, res);
  indexLoaded = true;
  // } else {
  //   console.log('here we do smth else');
  //   res.end();
  // }
};
