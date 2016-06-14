/**
 * FocusItem model events
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var _focusItemModel = require('./focusItem.model');

var _focusItemModel2 = _interopRequireDefault(_focusItemModel);

var FocusItemEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
FocusItemEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _focusItemModel2['default'].schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    FocusItemEvents.emit(event + ':' + doc._id, doc);
    FocusItemEvents.emit(event, doc);
  };
}

exports['default'] = FocusItemEvents;
module.exports = exports['default'];
//# sourceMappingURL=focusItem.events.js.map
