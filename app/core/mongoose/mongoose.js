var config = require('config');
var mongoose = require('mongoose');
require('mongoose-schema-extend');

var log = require('../log/')(module);
var modelsPath = process.cwd() + '/app/models';

var options = {};
options.server = {};
options.replset = {};
options.server.socketOptions = options.replset.socketOptions = {keepAlive: 1};

exports.init = function (cb) {
  if (!config.test) {
    mongoose.connect(config.mongoose.uri, options);
  } else {
    mongoose.connect(config.mongoose.testUri, options);
  }
  var db = mongoose.connection;
  var models = [
    'user'
  ];
  models.forEach(function (file) {
    require(modelsPath + '/' + file);
  });

  db.on('error', function (err) {
    throw new Error(err);
  });
  db.once('open', function callback() {
    log.info('db connection is established');
    cb();
  });
};