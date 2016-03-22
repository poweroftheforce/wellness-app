/**
 * FocusItem model events
 */

'use strict';

import {EventEmitter} from 'events';
import FocusItem from './focusItem.model';
var FocusItemEvents = new EventEmitter();

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
  FocusItem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FocusItemEvents.emit(event + ':' + doc._id, doc);
    FocusItemEvents.emit(event, doc);
  }
}

export default FocusItemEvents;
