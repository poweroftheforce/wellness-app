'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var NutraceuticalSchema = new mongoose.Schema({
  name: String,
  description: String,
  info: String
});

export default mongoose.model('Nutraceutical', NutraceuticalSchema);
