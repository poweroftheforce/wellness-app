'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PlanSectionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  html: String,
  nutraceuticals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nutraceutical' }], 
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
  references: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reference' }],
  _plan_id: {type: String, required: true, ref: 'Plan'},
}, { timestamps: true });

export default mongoose.model('PlanSection', PlanSectionSchema);