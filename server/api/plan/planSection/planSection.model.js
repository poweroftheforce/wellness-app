'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PlanSectionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  html: String,
  has_extras: Boolean,
  focusItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FocusItem' }],
  // Keep possiblity of storing these in database.
  // nutraceuticals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nutraceutical' }],
  // prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
  recommendations: String,
  nutraceuticals: String,
  prescriptions: String,
  references: String,
  addendums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Addendum' }],
  _plan_id: {type: String, required: true, ref: 'Plan'}
}, { timestamps: true });

export default mongoose.model('PlanSection', PlanSectionSchema);
