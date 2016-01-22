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
  created_at: { type: Date, default: Date.now },
  author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlanSection' }]
});


/**
 * Validations
 */

// Validate Patient
PlanSchema
  .path('created_at')
  .validate(function(patient) {
    if (!patient) {
      return false;
    }
    else if (patient.empty) {
      return false;
    }
    return true;
  }, 'Patient must be present!');

// Validate empty password
// PlanSchema
//   .path('password')
//   .validate(function(password) {
//     return password.length;
//   }, 'Password cannot be blank');

// // Validate email is not taken
// PlanSchema
//   .path('email')
//   .validate(function(value, respond) {
//     var self = this;
//     return this.constructor.findOneAsync({ email: value })
//       .then(function(user) {
//         if (user) {
//           if (self.id === user.id) {
//             return respond(true);
//           }
//           return respond(false);
//         }
//         return respond(true);
//       })
//       .catch(function(err) {
//         throw err;
//       });
//   }, 'The specified email address is already in use.');

// var validatePresenceOf = function(value) {
//   return value && value.length;
// };

export default mongoose.model('Plan', PlanSchema);
