'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AddendumSchema = new mongoose.Schema({
  title: String,
  description: String,
  notes: String,
  nutrition: { type: Boolean, 'default': false },
  exercise: { type: Boolean, 'default': false },
  hormones: { type: Boolean, 'default': false },
  inflammation: { type: Boolean, 'default': false },
  detoxification: { type: Boolean, 'default': false }
});

// No Duplicate Items
AddendumSchema.path('title').validate(function (value, respond) {
  var self = this;
  return this.constructor.findOneAsync({ title: value }).then(function (item) {
    if (item) {
      if (self.id === item.id) {
        return respond(true);
      }
      return respond(false);
    }
    return respond(true);
  })['catch'](function (err) {
    throw err;
  });
}, 'An addendum with this title has already been created.');
exports['default'] = mongoose.model('Addendum', AddendumSchema);
module.exports = exports['default'];
//# sourceMappingURL=addendum.model.js.map
