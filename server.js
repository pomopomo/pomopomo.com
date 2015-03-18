var config = require('config');
var express = require('express');

var app = express();
var log = require('./app/core/log/')(module);

var expressUtil = require('./app/core/express/');
expressUtil.init(app);

app.listen(config.server.port, function () {
  log.info('App is started at port:', config.server.port);
});