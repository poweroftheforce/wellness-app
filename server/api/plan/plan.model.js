'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var drugReactionSchema = new mongoose.Schema({
  drug_category: String,
  nutrients_depleted: String,
  potential_negative_reactions: String,
  references: String
});

var PlanSchema = new mongoose.Schema({
  patient: {
    name: {
      first: {
        type: String,
        required: true,
        maxlength: 30 },
      last: {
        type: String,
        required: true,
        maxlength: 30 }
    },
    dob: String,
    notes: String
  },
  _author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlanSection' }],
  drugReactions: [drugReactionSchema]
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

/**
 * Virtuals
 */

PlanSchema.virtual('patientName').get(function () {
  return this.patient.name.first + ' ' + this.patient.name.last;
});

/**
 * Validations
 */

// Validate Patient
PlanSchema.path('createdAt').validate(function (patient) {
  if (!patient) {
    return false;
  } else if (patient.empty) {
    return false;
  }
  return true;
}, 'Patient must be present!');

exports['default'] = mongoose.model('Plan', PlanSchema);
module.exports = exports['default'];
//# sourceMappingURL=plan.model.js.map
