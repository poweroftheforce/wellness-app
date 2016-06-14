'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TemplateSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, 'default': 0 },
  html: String,
  intro: String,
  has_extras: Boolean,
  is_editable: Boolean,
  is_active: Boolean,
  _template_id: { type: String, required: true, ref: 'Template' }
}, { timestamps: true });

exports['default'] = mongoose.model('TemplateSection', TemplateSectionSchema);
module.exports = exports['default'];
//# sourceMappingURL=templateSection.model.js.map
