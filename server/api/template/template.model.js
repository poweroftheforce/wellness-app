'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TemplateSchema = new mongoose.Schema({
  version: String,
  author: String,
  sections: [{
    	name: String,
    	order: Number,
    	cover_page: String,
    	html: String,
      updated_at: { type: Date, default: Date.now }
  }],
  updated_at: { type: Date, default: Date.now }
});	

export default mongoose.model('Template', TemplateSchema);
