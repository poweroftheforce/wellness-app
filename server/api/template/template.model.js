'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TemplateSchema = new mongoose.Schema({
  version: { type: String, unique: true, required: true, dropDups: true },
  author: { type: String, unique: true, required: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TemplateSection' }]
}, { timestamps: true });

exports['default'] = mongoose.model('Template', TemplateSchema);
module.exports = exports['default'];
//# sourceMappingURL=template.model.js.map
