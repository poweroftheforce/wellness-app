'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PlanSchema = new mongoose.Schema({
  patient: {
  	name: {
      first: {
        type: String,
        required: true,
        maxlength: 30},
      last: {
        type: String,
        required: true,
        maxlength: 30}
    },
  	dob: String,
  	notes: String
  },
  _author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlanSection' }]
}, { timestamps: true });


/**
 * Validations
 */

// Validate Patient
PlanSchema
  .path('createdAt')
  .validate(function(patient) {
    if (!patient) {
      return false;
    }
    else if (patient.empty) {
      return false;
    }
    return true;
  }, 'Patient must be present!');

export default mongoose.model('Plan', PlanSchema);
