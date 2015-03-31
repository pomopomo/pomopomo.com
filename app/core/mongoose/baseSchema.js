var mongoose = require('mongoose');
var shortId = require('shortid');

var baseSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

baseSchema.options.toJSON = {
  transform: function (doc, ret) {
    var fields = '__v __t isDeleted'.split(' ');
    fields.forEach(function (e) {
      if (ret && ret[e]) {
        delete ret[e];
      }
    });
    return ret;
  }
};

baseSchema.pre('save', function (next) {
  var self = this;
  if (self.updatedAt) {
    self.updatedAt = new Date();
  }
  return next();
});

module.exports = baseSchema;