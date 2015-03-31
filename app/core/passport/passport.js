var config = require('config');
var mongoose = require('mongoose');
var _ = require('underscore');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var log = require('../log/')(module);

exports.init = function () {

  var User = mongoose.model('User');

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id).exec(done);
  });

  passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
          },
          function (accessToken, refreshToken, profile, done) {
            User.findOne({'google.id': profile.id})
                .exec(function (err, user) {
                  if (err) {
                    return done(err);
                  }
                  if (!user) {
                    user = new User();
                  }

                  var google = _.omit(profile,'_raw');
                  user.google = google;

                  user.save(function (err, user) {
                    if (err) {
                      log.log(err);
                      return done(err);
                    }
                    return done(null, user);
                  });
                });
          }
      )
  );

  passport.use(new BearerStrategy(
      function (token, done) {
        User
            .findOne({token: token})
            .exec(function (err, user) {
              if (err) {
                return done(err);
              }
              if (!user) {
                return done(null, false);
              }
              return done(null, user);
            });
      }
  ));
};