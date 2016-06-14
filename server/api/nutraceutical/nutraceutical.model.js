'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var NutraceuticalSchema = new mongoose.Schema({
  name: String,
  description: String,
  info: String
});

exports['default'] = mongoose.model('Nutraceutical', NutraceuticalSchema);
module.exports = exports['default'];
//# sourceMappingURL=nutraceutical.model.js.map
