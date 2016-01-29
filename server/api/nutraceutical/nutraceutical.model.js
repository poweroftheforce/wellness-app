'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var NutraceuticalSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Nutraceutical', NutraceuticalSchema);
