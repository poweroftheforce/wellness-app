'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ReferenceSchema = new mongoose.Schema({
  name: String,
  description: String,
  info: String
});

export default mongoose.model('Reference', ReferenceSchema);
