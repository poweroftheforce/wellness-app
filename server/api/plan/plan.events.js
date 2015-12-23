/**
 * Plan model events
 */

'use strict';

import {EventEmitter} from 'events';
var Plan = require('./plan.model');
var PlanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Plan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PlanEvents.emit(event + ':' + doc._id, doc);
    PlanEvents.emit(event, doc);
  }
}

export default PlanEvents;
