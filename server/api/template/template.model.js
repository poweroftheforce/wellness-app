'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TemplateSchema = new mongoose.Schema({
  version: {type: String, unique: true, required: true, dropDups: true},
  author: {type: String, unique: true, required: true},
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TemplateSection' }]
}, { timestamps: true });

export default mongoose.model('Template', TemplateSchema);
