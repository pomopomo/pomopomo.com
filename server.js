var config = require('config');
var express = require('express');

var app = express();
var log = require('./app/core/log/')(module);

var mongooseUtil = require('./app/core/mongoose/');

var server = function (cb) {
  mongooseUtil.init(function () {

    var expressUtil = require('./app/core/express/');
    var passportUtil = require('./app/core/passport/');

    passportUtil.init(app);
    expressUtil.init(app);

    app.listen(config.server.port, function () {
      log.info('App is started at port:', config.server.port);
      if (cb) {
        cb();
      }
    });
  });
};

if (require.main === module) {
  log.info('Server is started in standalone mode');
  server();
} else {
  log.info('Server is started for testing');
  module.exports = server;
}

process.on('uncaughtException', function (err) {
  log.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
});