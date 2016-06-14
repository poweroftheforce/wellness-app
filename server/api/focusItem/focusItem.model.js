'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var FocusItemSchema = new _mongoose2['default'].Schema({
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
FocusItemSchema.path('title').validate(function (value, respond) {
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
}, 'A Focus Item with this title has already been created.');

exports['default'] = _mongoose2['default'].model('FocusItem', FocusItemSchema);
module.exports = exports['default'];
//# sourceMappingURL=focusItem.model.js.map
