'use strict';

import mongoose from 'mongoose';

var FocusItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  notes: String,
  nutrition: { type: Boolean, default: false},
  exercise: { type: Boolean, default: false},
  hormones: { type: Boolean, default: false},
  inflammation: { type: Boolean, default: false},
  detoxification: { type: Boolean, default: false}
});

// No Duplicate Items
FocusItemSchema
  .path('title')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOneAsync({ title: value })
      .then(function(item) {
        if (item) {
          if (self.id === item.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'A Focus Item with this title has already been created.');

export default mongoose.model('FocusItem', FocusItemSchema);
