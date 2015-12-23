'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PlanSchema = new mongoose.Schema({
  patient: {
  	name: String,
  	dob: String,
  	notes: String
  },
  created_at: { type: Date, default: Date.now },
  author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
  },
  sections: [{
    	name: String,
    	order: Number,
    	cover_page: String,
    	html: String
  }]
});

export default mongoose.model('Plan', PlanSchema);
