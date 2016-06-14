/**
 * Template model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Template = require('./template.model');
var TemplateEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
TemplateEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Template.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    TemplateEvents.emit(event + ':' + doc._id, doc);
    TemplateEvents.emit(event, doc);
  };
}

exports['default'] = TemplateEvents;
module.exports = exports['default'];
//# sourceMappingURL=template.events.js.map
