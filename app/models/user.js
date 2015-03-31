var mongoose = require('mongoose');
var rid = require('readable-id');
var genId = require('gen-id')('XXXXXXXXXXXXXXXX');


var Schema = mongoose.Schema;
var baseSchema = require('../core/mongoose/baseSchema');

var User = baseSchema.extend({
  token: {
    type: String,
    unique: true,
    required: true
  },
  google: Schema.Types.Mixed
});


User
    .pre('validate', function (next) {
      if (this.isNew) {
        this.token = rid() + genId.generate();
      }
      next();
    });

mongoose.model('User', User);