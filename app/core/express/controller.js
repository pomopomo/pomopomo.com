var fs = require('fs');

var controllers = {};
var controllersPath = process.cwd() + '/app/controllers';

fs.readdirSync(controllersPath).forEach(function (file) {
  if (file.match(/\.js$/)) {
    controllers[file.split('.')[0].toLowerCase()] =
        require(controllersPath + '/' + file);
  }
});

module.exports = exports = controllers;