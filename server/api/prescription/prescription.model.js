'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PrescriptionSchema = new mongoose.Schema({
  name: String,
  description: String,
  info: String
});

exports['default'] = mongoose.model('Prescription', PrescriptionSchema);
module.exports = exports['default'];
//# sourceMappingURL=prescription.model.js.map
