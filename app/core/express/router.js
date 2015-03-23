var config = require('config');
var express = require('express');
var passport = require('passport');

var controllers = require('./controller');
var log = require('../log/')(module);

exports.init = function (app) {

  var apiRouter = express.Router();
  app.use('/api/' + config.api.version, apiRouter);

  var router = express.Router();

  router.route('/auth/google')
      .get(
      passport.authenticate('google', {scope: config.google.scope}),
      controllers.site.redirect);

  router.route('/auth/google/callback')
      .get(
      passport.authenticate('google', {failureRedirect: '/'}),
      controllers.site.redirect);

  router.route('*')
      .get(controllers.site.index);

  app.use(router);
  log.info('Router configured');
};