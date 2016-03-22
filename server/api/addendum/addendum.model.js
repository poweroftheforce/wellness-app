'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AddendumSchema = new mongoose.Schema({
  title: String,
  html: String,
  notes: String
});

export default mongoose.model('Addendum', AddendumSchema);
