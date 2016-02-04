'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TemplateSectionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  order: {type: Number, default: 0},
  cover_page: String,
  html: String,
  has_extras: Boolean,
  is_editable: Boolean,
  _template_id: {type: String, required: true, ref: 'Template'},
}, { timestamps: true });

export default mongoose.model('TemplateSection', TemplateSectionSchema);