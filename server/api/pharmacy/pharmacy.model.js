'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var PharmacySchema = new _mongoose2['default'].Schema({
  name: String,
  phone: String,
  fax: String,
  email: String,
  contact: String
});

exports['default'] = _mongoose2['default'].model('Pharmacy', PharmacySchema);
module.exports = exports['default'];
//# sourceMappingURL=pharmacy.model.js.map
