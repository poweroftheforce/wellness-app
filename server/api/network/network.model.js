'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var NetworkSchema = new _mongoose2['default'].Schema({
  name: String,
  url: String
});

exports['default'] = _mongoose2['default'].model('Network', NetworkSchema);
module.exports = exports['default'];
//# sourceMappingURL=network.model.js.map
