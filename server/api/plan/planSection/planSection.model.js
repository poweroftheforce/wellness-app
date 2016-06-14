'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PlanSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: String,
  comments: String,
  focusItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FocusItem' }],
  recommendations: String,
  nutraceuticals: String,
  prescriptions: String,
  addendums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Addendum' }],
  references: String,
  // html: String,
  _plan_id: { type: String, required: true, ref: 'Plan' }
}, { timestamps: true });

exports['default'] = mongoose.model('PlanSection', PlanSectionSchema);
module.exports = exports['default'];
//# sourceMappingURL=planSection.model.js.map
