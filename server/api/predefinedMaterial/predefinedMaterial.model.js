'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PredefinedMaterialSchema = new mongoose.Schema({
  name: String,
  description: String,
  info: String
});

export default mongoose.model('PredefinedMaterial', PredefinedMaterialSchema);
