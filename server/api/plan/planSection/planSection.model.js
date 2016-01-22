'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PlanSectionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  order: {type: Number, default: 0},
  cover_page: String,
  html: String,

}, { timestamps: true });

export default mongoose.model('PlanSection', PlanSectionSchema);